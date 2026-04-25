import { JsonLdIri } from "@/packages/jsonLd/jsonLd"
import { BuildingEntityInterface } from "@/packages/game/entity/EntityInterface"
import { ActionInterface, ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { enoughResource } from "@/packages/game/inventory/useCase/enoughResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"

enum State {
  GoToForum = "GoToForum",
  TakeResource = "TakeResource",
  GoToBuild = "GoToBuild",
  PutResource = "PutResource",
}

interface FindWorkerData {
  state: State
  buildingIri?: JsonLdIri
}

const NO_BUILDING_THROTTLE = 60

export const goBuildOfBuildingActionResource: ActionResourceInterface<
  ActionInterface<FindWorkerData>
> = createActionResource<ActionResourceInterface<ActionInterface<FindWorkerData>>>({
  "@id": "goBuildOfBuilding",
  onFrame: ({ action, game, entity }) => {
    if (!entity) return

    const data = action.data
    if (!data.state) data.state = State.GoToForum
    const building = entityQueryFindOne<BuildingEntityInterface>(game, {
      "@id": data.buildingIri,
      state: EntityState.under_construction,
    })

    if (!building) {
      entity.state = EntityState.wait
      data.state = State.GoToForum
      data.buildingIri = undefined
      updateNextTick(game, action, NO_BUILDING_THROTTLE)
      return
    }

    const entityMetadata = getResource<EntityResourceInterface>(entity)
    const buildingMeta = getResource<EntityResourceInterface>(building)

    if (data.state === State.GoToForum) {
      const forum = entityQueryFindOne(game, {
        "@type": forumEntityResource["@id"],
      })

      if (!forum) {
        entity.state = EntityState.wait
        return
      }

      entity.state = EntityState.move
      const result = entityGoToEntityWithGround({ game, entity, target: forum })
      if (result.isFinish) data.state = State.TakeResource
      return
    }

    if (data.state === State.TakeResource) {
      const requirements = Object.values(
        buildingMeta.propriety?.resourceForConstruction?.member ?? {},
      )

      const taken = requirements
        .filter((resource) => {
          const inBuilding = getInventoryItem(building.inventory, resource["@type"])
          return inBuilding.quantity < resource.quantity
        })
        .map((resource) =>
          transfertInventoryByItem(
            game.inventory,
            entity.inventory,
            resource["@type"],
            entityMetadata.propriety.inventorySize ?? 0,
          ),
        )

      if (taken.some((amount) => amount > 0)) {
        data.state = State.GoToBuild
      } else {
        entity.state = EntityState.wait
      }
      return
    }

    if (data.state === State.GoToBuild) {
      entity.state = EntityState.move
      const result = entityGoToEntityWithGround({ game, entity, target: building })
      if (result.isFinish) data.state = State.PutResource
      return
    }

    if (data.state === State.PutResource) {
      Object.values(entity.inventory.member ?? {}).forEach((item) => {
        transfertInventoryByItem(
          entity.inventory,
          building.inventory,
          item["@type"],
          entityMetadata.propriety.inventorySize ?? 0,
        )
      })

      const isComplete = enoughResource(
        buildingMeta.propriety.resourceForConstruction as InventoryInterface,
        building.inventory,
      )

      if (isComplete) {
        building.state = EntityState.builded
        data.buildingIri = undefined
        updateEntityInGame(game, building)
      }

      data.state = State.GoToForum
    }
  },
})
