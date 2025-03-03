import { createJsonLd, createJsonLdType, JsonLdIri } from "@/src/utils/jsonLd/jsonLd"
import EntityInterface, {
  BuildingEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { enoughRessource } from "@/src/game/inventory/useCase/enoughRessource"
import { forumEntityMetaData } from "@/src/game/entity/app/building/forum/ForumEntity"
import { appLdType } from "@/src/AppLdType"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { entityGoToEntity } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { InventoryInterface } from "@/src/game/inventory/InventoryInterface"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"

enum State {
  GoToForum = "GoToForum",
  TakeRessource = "TakeRessource",
  GoToBuild = "GoToBuild",
  PutRessource = "PutRessource",
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

export const goBuildOfBuildingActionMetadata = actionMetaDataFactory<
  ActionMetadataInterface<FindWorkerData>
>({
  ["@type"]: createJsonLdType(appLdType.typeAction, "goBuildOfBuilding"),
  onFrame: ({ action, game, entity }) => {
    if (!entity) return
    const entityMetadata = getMetaData<EntityMetaDataInterface>(entity)
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

    const buildingMeta = getMetaData<EntityMetaDataInterface>(building)

    if (building && data.state === State.NoBuild) {
      data.state = State.GoToForum
    }

    entity.state = EntityState.move

    if (data.state === State.GoToForum) {
      const forum = entityQueryFindOne(game, {
        "@type": forumEntityMetaData["@type"],
      })

      if (!forum) {
        data.state = State.ForumNotFound
        return
      }

      const result = entityGoToEntity({ entity, target: forum })
      if (result.isFinish) {
        data.state = State.TakeRessource
      }
    }

    if (data.state === State.TakeRessource) {
      const ressourceTaken = Object.values(
        buildingMeta.propriety?.ressourceForConstruction ?? {},
      )
        .filter((ressource) => {
          const inventoryRessource = getInventoryItem(
            building.inventory,
            ressource["@type"],
          )
          return inventoryRessource.quantity < ressource.quantity
        })
        .map((ressource) => {
          return transfertInventoryByItem(
            game.inventory,
            entity.inventory,
            ressource["@type"],
            entityMetadata.propriety.inventorySize ?? 0,
          )
        })

      const hasTakeRessource = ressourceTaken.some((amount) => amount > 0)

      if (hasTakeRessource) {
        data.state = State.GoToBuild
      } else {
        entity.state = EntityState.wait
      }
    }

    if (data.state === State.GoToBuild) {
      const result = entityGoToEntity({ entity, target: building })
      if (result.isFinish) {
        data.state = State.PutRessource
      }
    }

    if (data.state === State.PutRessource) {
      Object.values(entity.inventory).forEach((item) => {
        transfertInventoryByItem(
          entity.inventory,
          building.inventory,
          item["@type"],
          entityMetadata.propriety.inventorySize ?? 0,
        )
      })

      if (
        enoughRessource(
          buildingMeta.propriety.ressourceForConstruction as InventoryInterface,
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

    return createJsonLd(goBuildOfBuildingActionMetadata["@type"], { data })
  },
})
