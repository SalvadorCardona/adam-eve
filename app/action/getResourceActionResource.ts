import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { EntityState } from "@/packages/game/entity/EntityState"
import {
  entityFindOneById,
  entityQuery,
} from "@/packages/game/game/useCase/query/entityQuery"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { removeActionFromEntity } from "@/packages/game/action/removeAction"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { ResourceMappingMetadataInterface } from "@/app/resourceMappingMetadata"
import { getResource } from "@/packages/resource/ResourceInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { freeSpaceInInventory } from "@/packages/game/inventory/useCase/freeSpaceInInventory"
import { spawnFloatingText } from "@/app/entity/effect/floatingText/FloatingTextEntityResource"
import { findClosestEntity } from "@/packages/game/game/useCase/query/findClosestEntity"

export const getResourceActionResource = createActionResource({
  "@id": "getResourceAction",
  onFrame: ({ entity, game, action }) => {
    if (!entity || !action.createdBy) return
    const createdBy = entityFindOneById(game, action.createdBy) as EntityInterface
    const createdByResource = getResource(createdBy)
    const resourceMapping =
      getResource<ResourceMappingMetadataInterface>("resourceMapping")

    if (!createdBy["@id"]) return
    const resourceMapped = resourceMapping.getItem(createdByResource["@id"])
    if (!resourceMapped) {
      return
    }

    const targetIri = action.data?.targetResourceId as
      | EntityInterface["@id"]
      | undefined
    let targetResource = targetIri
      ? (entityFindOneById(game, targetIri) as EntityInterface | undefined)
      : undefined

    if (targetIri && !targetResource) {
      action.data.targetResourceId = undefined
      if (entity.state === EntityState.cut_the_tree) {
        entity.state = EntityState.go_to_resource
      }
    }

    if (
      entity.state === EntityState.go_to_resource ||
      entity.state === EntityState.wait
    ) {
      if (!targetResource) {
        const candidates = entityQuery(game, {
          "@type": resourceMapped.entityMetaDataResource["@id"],
          "@idIsNot": entity["@id"],
        }).filter((e) => !e.workers?.some((id) => entityFindOneById(game, id)))

        const [closest] = findClosestEntity(entity.position, candidates)

        if (!closest) {
          entity.state = EntityState.wait
          updateNextTick(game, action, 60)

          return
        }

        targetResource = closest
        targetResource.workers = [entity["@id"]]
        action.data.targetResourceId = targetResource["@id"]
      }

      entityGoToEntityWithGround({
        entity: entity,
        target: targetResource,
        game,
      })

      if (entityAttackEntity(game, entity, targetResource)) {
        entity.state = EntityState.cut_the_tree
      }
    }

    if (entity.state === EntityState.cut_the_tree) {
      const added = addToInventory(entity.inventory, resourceMapped.resource, 1)

      if (added > 0 && resourceMapped.resource.asset?.icon) {
        spawnFloatingText(
          game,
          entity.position,
          resourceMapped.resource.asset.icon,
          `+${added}`,
        )
      }

      if (!freeSpaceInInventory(entity.inventory)) {
        entity.state = EntityState.go_to_put_resource
      }

      updateNextTick(game, action, 60)
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
        transfertInventoryByItem(
          entity.inventory,
          game.inventory,
          resourceMapped.resource,
          Infinity,
        )
        entity.state = EntityState.go_to_resource
      }
    }
  },
})
