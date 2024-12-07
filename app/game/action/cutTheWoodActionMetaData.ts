import { ActionMetadataInterface } from "@/app/domain/action/ActionMetadataInterface"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import {
  generatePathCoordinates,
  PathCoordinate,
} from "@/app/domain/3D/pathCoordinate/generatePathCoordinates"
import {
  addToInventory,
  getInventoryItem,
  InventoryItemInterface,
} from "@/app/domain/inventory/InventoryItemInterface"
import { woodRessourceMetadata } from "@/app/game/ressource/wood/woodRessource"
import { consumePathCoordinate } from "@/app/domain/3D/pathCoordinate/consumePathCoordinate"
import { findClosest } from "@/app/domain/3D/findClosest"

import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { treeEntityMetaData } from "@/app/game/entity/tree/TreeEntity"

enum CutTheWoodState {
  CutTheThree = "CutTheThree",
  GoToTree = "GoToTree",
  GoToBuild = "GoToBuild",
}

interface cutTheWoodDataInterface {
  lastTimeWoodcut: number
  treeEntity?: EntityInterface
  threePathCoordinate?: PathCoordinate
  housePathCoordinate?: PathCoordinate
  state: CutTheWoodState
  woodInventory: InventoryItemInterface
}

export const cutTheWoodActionMetaData: ActionMetadataInterface<cutTheWoodDataInterface> =
  {
    ["@type"]: "action/cutTheWood",
    onFrame: ({ entity, action, game }) => {
      const data = action.data

      const getThreePathCoordinate = (): PathCoordinate => {
        if (action.data.threePathCoordinate) return action.data.threePathCoordinate
        action.data.treeEntity = findClosest(
          entity,
          treeEntityMetaData["@type"],
          game,
        )

        action.data.threePathCoordinate = generatePathCoordinates(
          entity.position,
          action.data.treeEntity.position,
          50,
        )

        return action.data.threePathCoordinate
      }

      const getHousePathCoordinate = (): PathCoordinate => {
        if (action.data.housePathCoordinate) return action.data.housePathCoordinate
        action.data.housePathCoordinate = findClosest(
          entity,
          houseEntityMetaData["@type"],
          game,
        )

        action.data.housePathCoordinate = generatePathCoordinates(
          entity.position,
          action.data.housePathCoordinate.position,
          50,
        )

        return action.data.housePathCoordinate
      }

      if (data.state === CutTheWoodState.GoToTree) {
        const consumePathCoordinateResult = consumePathCoordinate({
          position: entity.position,
          pathCoordinate: getThreePathCoordinate(),
        })

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

      const data: cutTheWoodDataInterface = {
        lastTimeWoodcut: 0,
        state: CutTheWoodState.GoToTree,
        woodInventory,
      }

      return jsonLdFactory(cutTheWoodActionMetaData["@type"], { data })
    },
  }