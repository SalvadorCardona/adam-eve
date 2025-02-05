import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { createJsonLd, createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { transfertInventory } from "@/src/game/inventory/useCase/transfertInventory"
import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { updateNextTick } from "@/src/game/action/ActionInterface"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"
import { removeActionFromEntity } from "@/src/game/action/removeAction"

interface CutTheWoodDataInterface {}

export const cutTheWoodActionMetaData: ActionMetadataInterface<CutTheWoodDataInterface> =
  {
    ["@type"]: createJsonLdType(appLdType.typeAction, "cutTheWood"),
    onFrame: ({ entity, game, action }) => {
      if (!entity) return

      if (
        entity.state === EntityState.go_to_tree ||
        entity.state === EntityState.wait
      ) {
        const newTreeEntity = entityQueryFindOne(game, {
          "@type": treeEntityMetaData["@type"],
        })

        if (!newTreeEntity) {
          entity.state = EntityState.wait
          updateNextTick(game, action, 60)

          return
        }

        entityGoToEntityWithGround({
          entity,
          target: newTreeEntity,
          game,
        })

        if (entityAttackEntity(game, entity, newTreeEntity)) {
          entity.state = EntityState.cut_the_tree
        }
      }

      if (entity.state === EntityState.cut_the_tree) {
        addToInventory(entity, woodRessourceMetadata, 1)

        if (inventoryIsFull(entity)) {
          entity.state = EntityState.go_to_put_ressource
        }

        updateNextTick(game, action, 10)
      }

      if (entity.state === EntityState.go_to_put_ressource) {
        const target = entityQueryFindOne(game, {
          "@type": appLdType.timberHouseEntity,
        })

        if (!target) {
          removeActionFromEntity(entity, action)
          return
        }

        const result = entityGoToEntityWithGround({
          game,
          entity,
          target: target,
        })

        if (result.isFinish) {
          transfertInventory(entity, target, woodRessourceMetadata, 10)
          entity.state = EntityState.go_to_tree
        }
      }
    },
    factory: () => {
      return createJsonLd(cutTheWoodActionMetaData["@type"], {})
    },
  }
