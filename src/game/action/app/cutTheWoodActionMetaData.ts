import { ActionEntityMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import {
  generatePathCoordinates,
  PathCoordinate,
} from "@/src/game/3D/pathCoordinate/generatePathCoordinates"
import {
  addToInventory,
  getInventoryItem,
  InventoryItemInterface,
} from "@/src/game/inventory/InventoryItemInterface"
import { consumePathCoordinate } from "@/src/game/3D/pathCoordinate/consumePathCoordinate"
import { findClosest } from "@/src/game/3D/findClosest"
import { treeEntityMetaData } from "@/src/game/entity/app/tree/TreeEntity"
import { houseEntityMetaData } from "@/src/game/entity/app/house/houseEntity"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"

enum CutTheWoodState {
  CutTheThree = "CutTheThree",
  GoToTree = "GoToTree",
  GoToBuild = "GoToBuild",
}

interface CutTheWoodDataInterface {
  lastTimeWoodcut: number
  treeEntity?: EntityInterface
  houseEntity?: EntityInterface
  threePathCoordinate?: PathCoordinate
  housePathCoordinate?: PathCoordinate
  state: CutTheWoodState
  woodInventory: InventoryItemInterface
}

export const cutTheWoodActionMetaData: ActionEntityMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: "action/cutTheWood",
    onFrame: ({ entity, action, game }) => {
      const data = action.data
      entity.state = "Running"
      const getThreePathCoordinate = (): PathCoordinate => {
        if (action.data.threePathCoordinate) return action.data.threePathCoordinate
        action.data.treeEntity = findClosest(
          entity,
          treeEntityMetaData["@type"],
          game,
        )

        if (!action.data.treeEntity) {
          return []
        }

        action.data.threePathCoordinate = generatePathCoordinates(
          entity.position,
          action.data.treeEntity.position,
        )

        return action.data.threePathCoordinate
      }

      const getHousePathCoordinate = (): PathCoordinate => {
        if (action.data.housePathCoordinate) return action.data.housePathCoordinate
        action.data.houseEntity = findClosest(
          entity,
          houseEntityMetaData["@type"],
          game,
        )

        if (!action.data.houseEntity) {
          return []
        }

        action.data.housePathCoordinate = generatePathCoordinates(
          entity.position,
          action.data.houseEntity.position,
        )

        return action.data.housePathCoordinate
      }

      if (data.state === CutTheWoodState.GoToTree) {
        const consumePathCoordinateResult = consumePathCoordinate({
          position: entity.position,
          pathCoordinate: getThreePathCoordinate(),
        })

        entity.rotation = consumePathCoordinateResult.rotation
        entity.position = consumePathCoordinateResult.position
        action.data.threePathCoordinate = consumePathCoordinateResult.pathCoordinate

        if (consumePathCoordinateResult.isFinish) {
          action.data.threePathCoordinate = undefined
          data.state = CutTheWoodState.CutTheThree
        }
      }

      if (data.state === CutTheWoodState.CutTheThree) {
        data.woodInventory.quantity++
        if (data.woodInventory.quantity > 50) {
          data.state = CutTheWoodState.GoToBuild
        }
      }

      if (data.state === CutTheWoodState.GoToBuild) {
        const consumePathCoordinateResult = consumePathCoordinate({
          position: entity.position,
          pathCoordinate: getHousePathCoordinate(),
        })

        entity.rotation = consumePathCoordinateResult.rotation
        entity.position = consumePathCoordinateResult.position
        action.data.housePathCoordinate = consumePathCoordinateResult.pathCoordinate

        if (consumePathCoordinateResult.isFinish) {
          addToInventory(game.inventory, data.woodInventory)
          data.woodInventory.quantity = 0

          action.data.housePathCoordinate = undefined
          data.state = CutTheWoodState.GoToTree
        }
      }
    },
    factory: (payload) => {
      const woodInventory = getInventoryItem(
        payload.entity.inventory,
        woodRessourceMetadata["@type"],
      )

      const data: CutTheWoodDataInterface = {
        lastTimeWoodcut: 0,
        state: CutTheWoodState.GoToTree,
        woodInventory,
      }

      return jsonLdFactory(cutTheWoodActionMetaData["@type"], { data })
    },
  }
