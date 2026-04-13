import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"
import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { appLdType } from "@/app/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import {
  entityFindOneById,
  entityQueryFindOne,
} from "@/src/game/game/useCase/query/entityQuery"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { removeActionFromEntity } from "@/src/game/action/removeAction"
import { actionResourceFactory } from "@/src/game/action/actionResourceFactory"
import { updateNextTick } from "@/src/game/action/updateNextTick"
import { ResourceMappingMetadataInterface } from "@/src/resource/resourceMappingMetadata"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export const getResourceActionMetaData = actionResourceFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "getResource"),
  onFrame: ({ entity, game, action }) => {
    if (!entity || !action.createdBy) return
    const createdBy = entityFindOneById(game, action.createdBy) as EntityInterface

    const resourceMapping =
      getMetaData<ResourceMappingMetadataInterface>("resourceMapping")

    const resourceMapped = resourceMapping.getItem(createdBy["@type"])
    if (!resourceMapped) {
      return
    }

    if (
      entity.state === EntityState.go_to_tree ||
      entity.state === EntityState.wait
    ) {
      const newTreeEntity = entityQueryFindOne(game, {
        "@type": resourceMapped.entityMetaDataResource["@type"],
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
      const quantityAdded = addToInventory(entity, resourceMapped.resource, 1)
      if (quantityAdded === 0) {
        entity.state = EntityState.go_to_put_resource
      }

      updateNextTick(game, action, 10)
    }

    if (entity.state === EntityState.go_to_put_resource) {
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
        transfertInventoryByItem(entity, target, resourceMapped.resource, Infinity)
        entity.state = EntityState.go_to_tree
      }
    }
  },
})
