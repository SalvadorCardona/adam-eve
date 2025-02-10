import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"
import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import {
  entityFindOneById,
  entityQueryFindOne,
} from "@/src/game/game/useCase/query/entityQuery"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { removeActionFromEntity } from "@/src/game/action/removeAction"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { updateNextTick } from "@/src/game/action/updateNextTick"
import { RessourceMappingMetadataInterface } from "@/src/ressource/ressourceMappingMetadata"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export const getRessourceActionMetaData = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "getRessource"),
  onFrame: ({ entity, game, action }) => {
    if (!entity || !action.createdBy) return
    const createdBy = entityFindOneById(game, action.createdBy) as EntityInterface

    const ressourceMapping =
      getMetaData<RessourceMappingMetadataInterface>("ressourceMapping")

    const ressourceMapped = ressourceMapping.getItem(createdBy["@type"])
    if (!ressourceMapped) {
      return
    }

    if (
      entity.state === EntityState.go_to_tree ||
      entity.state === EntityState.wait
    ) {
      const newTreeEntity = entityQueryFindOne(game, {
        "@type": ressourceMapped.entityMetaDataRessource["@type"],
        findClosestOf: { position: entity.position },
        "@idIsNot": entity["@id"],
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
      const quantityAdded = addToInventory(entity, ressourceMapped.ressource, 1)
      if (quantityAdded === 0) {
        entity.state = EntityState.go_to_put_ressource
      }

      updateNextTick(game, action, 10)
    }

    if (entity.state === EntityState.go_to_put_ressource) {
      const target = entityFindOneById(game, action.createdBy)

      if (!target) {
        removeActionFromEntity(entity, action)
        return
      }

      const result = entityGoToEntityWithGround({
        game,
        entity,
        target,
      })

      if (result.isFinish) {
        transfertInventoryByItem(entity, target, ressourceMapped.ressource, Infinity)
        entity.state = EntityState.go_to_tree
      }
    }
  },
})
