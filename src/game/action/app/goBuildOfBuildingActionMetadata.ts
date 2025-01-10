import {
  jsonLdFactory,
  JsonLdIri,
  JsonLdTypeFactory,
} from "@/src/utils/jsonLd/jsonLd"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { enoughRessource } from "@/src/game/inventory/enoughRessource"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"
import { forumEntityMetaData } from "@/src/game/entity/app/building/forum/ForumEntity"
import { appLdType } from "@/src/AppLdType"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"

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

export const goBuildOfBuildingActionMetadata: ActionMetadataInterface<FindWorkerData> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "goBuildOfBuilding"),
    onFrame: ({ action, game, entity }) => {
      if (!entity) return
      const entityMetadata = getMetaData<EntityMetaDataInterface>(entity)
      const data = action.data

      const building = data.buildingIri
        ? entityQueryFindOne(game, {
            "@id": data.buildingIri,
          })
        : entityQueryFindOne(game, {
            state: EntityState.under_construction,
          })

      if (!building) {
        data.state = State.NoBuild
        entity.state = EntityState.wait
        return
      }

      if (building && data.state === State.NoBuild) {
        data.state = State.GoToForum
      }
      const buildingMeta = getMetaData<EntityMetaDataInterface>(building)
      entity.state = EntityState.move

      if (data.state === State.GoToForum) {
        const forum = entityQueryFindOne(game, {
          "@type": forumEntityMetaData["@type"],
        })

        if (!forum) {
          data.state = State.ForumNotFound
          return
        }

        const result = entityGoToEntityWithGround(entity, forum, game)
        if (entity?.currentPathOfCoordinate?.isFinish) {
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
            return transfertInventory(
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
        const result = entityGoToEntityWithGround(entity, building, game)
        if (entity?.currentPathOfCoordinate?.isFinish) {
          data.state = State.PutRessource
        }
      }

      if (data.state === State.PutRessource) {
        Object.values(entity.inventory).forEach((item) => {
          transfertInventory(
            entity.inventory,
            building.inventory,
            item["@type"],
            entityMetadata.propriety.inventorySize ?? 0,
          )
        })

        if (
          enoughRessource(
            buildingMeta.propriety.ressourceForConstruction as InventoryBagInterface,
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

      return jsonLdFactory(goBuildOfBuildingActionMetadata["@type"], { data })
    },
  }
