import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { EntityState } from "@/packages/game/entity/EntityState"
import {
  entityFindOneById,
  entityQueryFindOne,
} from "@/packages/game/game/useCase/query/entityQuery"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { removeActionFromEntity } from "@/packages/game/action/removeAction"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { ResourceMappingMetadataInterface } from "@/app/resourceMappingMetadata"
import { getResource } from "@/packages/resource/ResourceInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export const getResourceActionMetaData = createActionResource({
  "@id": "getResourceAction",
  onFrame: ({ entity, game, action }) => {
    if (!entity || !action.createdBy) return
    const createdBy = entityFindOneById(game, action.createdBy) as EntityInterface

    const resourceMapping =
      getResource<ResourceMappingMetadataInterface>("resourceMapping")

    if (!createdBy["@id"]) return
    const resourceMapped = resourceMapping.getItem(createdBy["@id"])
    if (!resourceMapped) {
      return
    }

    if (
      entity.state === EntityState.go_to_tree ||
      entity.state === EntityState.wait
    ) {
      const newTreeEntity = entityQueryFindOne(game, {
        "@type": resourceMapped.entityMetaDataResource["@id"],
        findClosestOf: { position: entity.position },
        "@idIsNot": entity["@id"],
      })

      if (!newTreeEntity) {
        entity.state = EntityState.wait
        updateNextTick(game, action, 60)

        return
      }

      entityGoToEntityWithGround({
        entity: entity,
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
        entity: entity,
        target,
      })

      if (result.isFinish) {
        transfertInventoryByItem(entity, target, resourceMapped.resource, Infinity)
        entity.state = EntityState.go_to_tree
      }
    }
  },
})
