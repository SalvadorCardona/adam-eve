import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { findClosestInGame } from "@/src/game/3D/findClosest"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { forumEntityMetaData } from "@/src/game/entity/app/forum/ForumEntity"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { addToInventory } from "@/src/game/inventory/addToInventory"
import { entityGoToEntity } from "@/src/game/entity/useCase/EntityGoToEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/tree/TreeEntity"

enum CutTheWoodState {
  CutTheThree = "CutTheThree",
  GoToTree = "GoToTree",
  GoToBuild = "GoToBuild",
}

interface CutTheWoodDataInterface {
  treeEntity?: EntityInterface
  forumEntity?: EntityInterface
  state: CutTheWoodState
}

export const cutTheWoodActionMetaData: ActionMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: "action/cutTheWood",
    onFrame: ({ entity, action, game }) => {
      const data = action.data
      if (!entity) return

      entity.state = "Running"

      if (data.state === CutTheWoodState.GoToTree) {
        if (!data.treeEntity) {
          data.treeEntity = findClosestInGame(
            entity,
            treeEntityMetaData["@type"],
            game,
          )
          console.log(data.treeEntity)
          if (!data.treeEntity) return
        }
        const result = entityGoToEntity(entity, data.treeEntity)

        if (result.isFinish) {
          data.state = CutTheWoodState.CutTheThree
        }
      }

      if (data.state === CutTheWoodState.CutTheThree) {
        addToInventory(entity.inventory, woodRessourceMetadata["@type"], 1)
        const woodRessource = getInventoryItem(
          entity.inventory,
          woodRessourceMetadata["@type"],
        )
        if (woodRessource.quantity > 50) {
          data.state = CutTheWoodState.GoToBuild
        }
      }

      if (data.state === CutTheWoodState.GoToBuild) {
        if (!data.forumEntity) {
          data.forumEntity = findClosestInGame(
            entity,
            forumEntityMetaData["@type"],
            game,
          )

          if (!data.forumEntity) return
        }
        const result = entityGoToEntity(entity, data.forumEntity)

        if (result.isFinish) {
          transfertInventory(
            entity.inventory,
            game.inventory,
            woodRessourceMetadata["@type"],
            10,
          )

          data.state = CutTheWoodState.GoToTree
        }
      }
    },
    factory: (payload) => {
      if (!payload.entity) {
        throw new Error("Entity is not here")
      }

      const data: CutTheWoodDataInterface = {
        state: CutTheWoodState.GoToTree,
      }

      return jsonLdFactory(cutTheWoodActionMetaData["@type"], { data })
    },
  }
