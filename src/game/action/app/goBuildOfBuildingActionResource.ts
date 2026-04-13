import { createJsonLd, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import EntityInterface, {
  BuildingEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { ActionResourceInterface } from "@/src/game/action/ActionResourceInterface"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { enoughResource } from "@/src/game/inventory/useCase/enoughResource"
import { forumEntityResource } from "@/src/game/entity/app/building/forum/forumEntityResource"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { entityGoToEntity } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { actionResourceFactory } from "@/src/game/action/actionResourceFactory"

enum State {
  GoToForum = "GoToForum",
  TakeResource = "TakeResource",
  GoToBuild = "GoToBuild",
  PutResource = "PutResource",
  NoBuild = "NoBuild",
  ForumNotFound = "ForumNotFound",
}

interface FindWorkerData {
  state: State
  buildingIri?: JsonLdIri
  buildingPathCoordinate?: EntityInterface
  forum?: EntityInterface
  forumPathCoordinate?: EntityInterface
}

export const goBuildOfBuildingActionResource = actionResourceFactory<
  ActionResourceInterface<FindWorkerData>
>({
  "@id": "action/goBuildOfBuilding",
  onFrame: ({ action, game, entity }) => {
    if (!entity) return
    const entityMetadata = getMetaData<EntityResourceInterface>(entity)
    const data = action.data

    const building = entityQueryFindOne<BuildingEntityInterface>(game, {
      "@id": data.buildingIri,
      state: EntityState.under_construction,
    })

    if (!building) {
      data.state = State.NoBuild
      entity.state = EntityState.wait
      return
    }

    const buildingMeta = getMetaData<EntityResourceInterface>(building)

    if (building && data.state === State.NoBuild) {
      data.state = State.GoToForum
    }

    entity.state = EntityState.move

    if (data.state === State.GoToForum) {
      const forum = entityQueryFindOne(game, {
        "@id": forumEntityResource["@id"],
      })

      if (!forum) {
        data.state = State.ForumNotFound
        return
      }

      const result = entityGoToEntity({ entity, target: forum })
      if (result.isFinish) {
        data.state = State.TakeResource
      }
    }

    if (data.state === State.TakeResource) {
      const resourceTaken = Object.values(
        buildingMeta.propriety?.resourceForConstruction ?? {},
      )
        .filter((resource) => {
          const inventoryResource = getInventoryItem(
            building.inventory,
            resource["@type"],
          )
          return inventoryResource.quantity < resource.quantity
        })
        .map((resource) => {
          return transfertInventoryByItem(
            game.inventory,
            entity.inventory,
            resource["@type"],
            entityMetadata.propriety.inventorySize ?? 0,
          )
        })

      const hasTakeResource = resourceTaken.some((amount) => amount > 0)

      if (hasTakeResource) {
        data.state = State.GoToBuild
      } else {
        entity.state = EntityState.wait
      }
    }

    if (data.state === State.GoToBuild) {
      const result = entityGoToEntity({ entity, target: building })
      if (result.isFinish) {
        data.state = State.PutResource
      }
    }

    if (data.state === State.PutResource) {
      Object.values(entity.inventory).forEach((item) => {
        transfertInventoryByItem(
          entity.inventory,
          building.inventory,
          item["@type"],
          entityMetadata.propriety.inventorySize ?? 0,
        )
      })

      if (
        enoughResource(
          buildingMeta.propriety.resourceForConstruction as InventoryInterface,
          building.inventory,
        )
      ) {
        building.state = EntityState.builded
        data.buildingIri = undefined
      }

      data.state = State.GoToForum
    }
  },
  factory: () => {
    const data: FindWorkerData = {
      state: State.GoToForum,
    }

    return createJsonLd(goBuildOfBuildingActionResource["@type"], { data })
  },
})
