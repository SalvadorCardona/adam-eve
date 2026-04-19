import { createJsonLd, JsonLdIri } from "@/packages/jsonLd/jsonLd"
import EntityInterface, {
  BuildingEntityInterface,
} from "@/packages/game/entity/EntityInterface"
import {
  ActionInterface,
  ActionResourceInterface,
} from "@/packages/game/action/ActionResourceInterface"
import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { enoughResource } from "@/packages/game/inventory/useCase/enoughResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import {
  entityFindOneById,
  entityQueryFindOne,
} from "@/packages/game/game/useCase/query/entityQuery"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { InventoryInterface } from "@/packages/game/inventory/InventoryInterface"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { removeActionFromEntity } from "@/packages/game/action/removeAction"
import { removeWorkerFromEntity } from "@/packages/game/entity/useCase/entityWorker"

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

export const goBuildOfBuildingActionResource: ActionResourceInterface<
  ActionInterface<FindWorkerData>
> = createActionResource<ActionResourceInterface<ActionInterface<FindWorkerData>>>({
  "@id": "goBuildOfBuilding",
  onFrame: ({ action, game, entity }) => {
    if (!entity) return
    const entityMetadata = getResource<EntityResourceInterface>(entity)
    const data = action.data

    const building = entityQueryFindOne<BuildingEntityInterface>(game, {
      "@id": data.buildingIri,
      state: EntityState.under_construction,
    })

    if (!building) {
      data.state = State.NoBuild
      entity.state = EntityState.wait

      const source = action.createdBy && entityFindOneById(game, action.createdBy)
      if (source) {
        removeWorkerFromEntity(source, entity)
      }
      removeActionFromEntity(entity, action)
      return
    }

    const buildingMeta = getResource<EntityResourceInterface>(building)

    if (building && data.state === State.NoBuild) {
      data.state = State.GoToForum
    }

    entity.state = EntityState.move

    if (data.state === State.GoToForum) {
      const forum = entityQueryFindOne(game, {
        "@type": forumEntityResource["@id"],
      })

      if (!forum) {
        data.state = State.ForumNotFound
        return
      }

      const result = entityGoToEntity({ entity: entity, target: forum })
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
      const result = entityGoToEntity({ entity: entity, target: building })
      if (result.isFinish) {
        data.state = State.PutResource
      }
    }

    if (data.state === State.PutResource) {
      Object.values(entity.inventory ?? {}).forEach((item) => {
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

    return createJsonLd(goBuildOfBuildingActionResource["@type"] ?? "action", {
      data,
      createdBy: "",
    }) as ActionInterface<FindWorkerData>
  },
})
