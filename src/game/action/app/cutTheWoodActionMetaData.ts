import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { getInventoryItem } from "@/src/game/inventory/getInventoryItem"
import { transfertInventory } from "@/src/game/inventory/transfertInventory"
import { addToInventory } from "@/src/game/inventory/addToInventory"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"

interface CutTheWoodDataInterface {}

export const cutTheWoodActionMetaData: ActionMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: appLdType.cutTheWoodAction,
    onFrame: ({ entity, game }) => {
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
          updateEntityInGame(game, entity)
          return
        }

        entityGoToEntityWithGround(entity, newTreeEntity, game)

        if (entity?.currentPathOfCoordinate?.isFinish) {
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
      }

      if (entity.state === EntityState.go_to_put_ressource) {
        const newTimberHouseEntity = entityQueryFindOne(game, {
          "@type": appLdType.timberHouseEntity,
        })

        if (!newTimberHouseEntity) return
        entityGoToEntityWithGround(entity, newTimberHouseEntity, game)

        if (entity?.currentPathOfCoordinate?.isFinish) {
          transfertInventory(
            entity.inventory,
            game.inventory,
            appLdType.woodRessource,
            10,
          )

          entity.state = EntityState.go_to_tree
        }

        updateEntityInGame(game, entity)
      }
    },
    factory: () => {
      return jsonLdFactory(cutTheWoodActionMetaData["@type"], {})
    },
  }
