import { ActionMetadataInterface } from "@/app/domain/action/ActionMetadataInterface"
import { areVectorsEqual, Vector3Interface } from "@/app/domain/3D/Vector"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import { findClosest } from "@/app/domain/3D/findClosest"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import {
  generatePathCoordinates,
  PathCoordinate,
} from "@/app/domain/3D/generatePathCoordinates"
import { getInventoryItem } from "@/app/domain/inventory/InventoryItemInterface"
import { woodRessourceMetadata } from "@/app/game/ressource/wood/woodRessource"
import { deleteContainerKey } from "@/packages/container/container"

interface cutTheWoodDataInterface {
  lastTimeWoodcut: number
  treeEntity?: EntityInterface
  threePathCoordinate?: PathCoordinate
  housePathCoordinate?: PathCoordinate
}

export const cutTheWoodActionMetaData: ActionMetadataInterface<cutTheWoodDataInterface> =
  {
    ["@type"]: "action/cutTheWood",
    onFrame: ({ entity, action, game }) => {
      const woodInventory = getInventoryItem(
        entity.inventory,
        woodRessourceMetadata["@type"],
      )

      if (!action.data?.treeEntity) {
        action.data.treeEntity = findClosest(
          entity,
          houseEntityMetaData["@type"],
          game,
        )

        action.data.threePathCoordinate = generatePathCoordinates(
          entity.position,
          action.data.treeEntity.position,
          1000,
        )
      }
      // Si bois = 0 allez à l'arbre le plus proche
      if (!woodInventory || woodInventory.quantity === 0) {
        if (action.data.threePathCoordinate.length < 2) {
          deleteContainerKey(entity.actions, action["@id"])
        }
        if (areVectorsEqual(entity.position, action.data.threePathCoordinate[0])) {
          entity.position = action.data.threePathCoordinate[1]
          action.data.threePathCoordinate.splice(1, 1)
        } else {
          entity.position = action.data.threePathCoordinate[0]
          action.data.threePathCoordinate.splice(0, 1)
        }
      }
      // Si bois = 5 retourne à la maison
      // Si bois = 0 et
    },
    factory: (payload: { entity: EntityInterface; target: Vector3Interface }) => {
      const data: cutTheWoodDataInterface = {
        lastTimeWoodcut: 0,
      }

      return jsonLdFactory(cutTheWoodActionMetaData["@type"], { data })
    },
  }
