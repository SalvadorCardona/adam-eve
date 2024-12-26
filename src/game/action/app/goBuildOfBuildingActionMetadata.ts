import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getByTypeInContainer } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { entityGoToEntity } from "@/src/game/entity/useCase/EntityGoToEntity"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { enoughRessource } from "@/src/game/inventory/enoughRessource"
import { InventoryBagInterface } from "@/src/game/inventory/InventoryItemInterface"

enum State {
  GoToForum,
  TakeRessource,
  GoToBuild,
  PutRessource,
  NoBuild,
}

interface FindWorkerData {
  state: State
  building?: EntityInterface
  buildingPathCoordinate?: EntityInterface
  forum?: EntityInterface
  forumPathCoordinate?: EntityInterface
}

export const goBuildOfBuildingActionMetadata: ActionMetadataInterface<FindWorkerData> =
  {
    ["@type"]: "action/goBuildOfBuilding",
    onFrame: ({ action, game, entity }) => {
      if (!entity) return
      const entityMetadata = getMetaData<EntityMetaDataInterface>(entity)
      const data = action.data

      const getBuilding = (): EntityInterface | undefined => {
        const currentBuilding = data.building
        if (currentBuilding?.isBuild) return currentBuilding
        data.building = getByTypeInContainer<EntityInterface>(
          game.entities,
          "entity/building",
        ).find((building) => {
          return !building.isBuild
        })

        return data.building
      }

      const getForum = (): EntityInterface | undefined => {
        const currentForum = data.forum
        if (currentForum) return currentForum

        const forum = getByTypeInContainer<EntityInterface>(
          game.entities,
          "entity/building/forum",
        )

        if (forum.length) {
          return forum[0]
        }

        return undefined
      }

      const building = getBuilding()

      if (!building) {
        data.state = State.NoBuild
        return
      }

      const buildingMeta = getMetaData<EntityMetaDataInterface>(building)
      entity.state = "Running"

      if (data.state === State.GoToForum) {
        const forum = getForum()
        if (!forum) {
          data.state = State.NoBuild
          return
        }
        const result = entityGoToEntity(entity, forum)
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
        }
      }

      if (data.state === State.GoToBuild) {
        const result = entityGoToEntity(entity, building)
        if (result.isFinish) {
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
          building.isBuild = true
        }
        data.state = State.GoToForum
      }
    },
    factory: (payload) => {
      const data: FindWorkerData = {
        state: State.GoToForum,
      }

      return jsonLdFactory(goBuildOfBuildingActionMetadata["@type"], { data })
    },
  }
