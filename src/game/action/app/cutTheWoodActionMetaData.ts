import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { addToInventory } from "@/src/game/inventory/addToInventory"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"
import { entityGoToEntity } from "@/src/game/entity/useCase/move/entityGoToEntity"

interface CutTheWoodDataInterface {}

export const cutTheWoodActionMetaData: ActionMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: appLdType.cutTheWoodAction,
    onFrame: ({ entity, game, action }) => {
      if (!entity) return

      if (entity.state === EntityState.wait) {
        entity.state = EntityState.go_to_tree
      }

      if (entity.state === EntityState.go_to_tree) {
        const newTreeEntity = entityQueryFindOne(game, {
          "@type": treeEntityMetaData["@type"],
        })

        if (!newTreeEntity) {
          entity.state = EntityState.wait
          action.nextTick = game.time + 60
          return
        }

        const result = entityGoToEntity({ entity, target: newTreeEntity })
        if (result.isFinish) {
          newTreeEntity.life -= 10
          entity.state = EntityState.cut_the_tree
        }
      }

      if (entity.state === EntityState.cut_the_tree) {
        addToInventory(entity.inventory, appLdType.woodRessource, 1)
        const woodRessource = getInventoryItem(
          entity.inventory,
          appLdType.woodRessource,
        )

        if (woodRessource.quantity > 50) {
          entity.state = EntityState.go_to_put_ressource
        }

        action.nextTick = game.time + 10
      }

      if (entity.state === EntityState.go_to_put_ressource) {
        const newTimberHouseEntity = entityQueryFindOne(game, {
          "@type": appLdType.timberHouseEntity,
        })

        if (!newTimberHouseEntity) return
        const result = entityGoToEntity({
          entity,
          target: newTimberHouseEntity,
        })

        if (result.isFinish) {
          transfertInventory(
            entity.inventory,
            game.inventory,
            appLdType.woodRessource,
            10,
          )

          entity.state = EntityState.go_to_tree
        }
      }
    },
    factory: () => {
      return jsonLdFactory(appLdType.cutTheWoodAction, {})
    },
  }
