import { createActionResource } from "@/packages/game/action/createActionResource"
import { keysPressed } from "@/packages/ui/keysState"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import EntityInterface, {
  EntityFaction,
} from "@/packages/game/entity/EntityInterface"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/packages/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/packages/game/entity/EntityState"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { getResource } from "@/packages/resource/ResourceInterface"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { spawnSlashInFront } from "@/app/entity/effect/slash/SlashEntityResource"
import { resourceMappingMetaData } from "@/app/resourceMappingMetadata"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { spawnFloatingText } from "@/app/entity/effect/floatingText/FloatingTextEntityResource"

const SEARCH_RADIUS = 10

export const playerAttackActionResource = createActionResource({
  ["@id"]: "action/player-attack",
  onFrame: ({ game, entity, action }) => {
    if (!entity) return

    const isAttackPressed = keysPressed["Space"] || keysPressed["KeyF"]
    if (!isAttackPressed) {
      if (entity.state === EntityState.attack) {
        entity.state = EntityState.wait
      }
      return
    }

    const metaData = getResource<EntityResourceInterface>(entity)
    const attack = metaData?.propriety?.attack
    if (!attack) return

    let target = entityQueryFindOne<EntityInterface>(game, {
      faction: EntityFaction.enemy,
      circleSearch: { center: entity.position, radius: SEARCH_RADIUS },
    })

    if (!target) {
      target = entityQueryFindOne<EntityInterface>(game, {
        entityType: EntityType.resource,
        circleSearch: { center: entity.position, radius: SEARCH_RADIUS },
        findClosestOf: { position: entity.position },
      })
    }

    spawnSlashInFront(game, entity)
    updateNextTick(game, action, attack.attackSpeed)

    if (!target) {
      entity.state = EntityState.wait
      return
    }

    if (!entityCanBeAttackEntity(entity, target)) return

    entityAttackEntity(game, entity, target)

    if (target.entityType === EntityType.resource) {
      const mapping = resourceMappingMetaData
        .getCollection()
        .find((m) => m.entityMetaDataResource["@id"] === target!["@type"])
      if (mapping) {
        const added = addToInventory(game.inventory, mapping.resource, 1)
        if (added > 0 && mapping.resource.asset?.icon) {
          spawnFloatingText(
            game,
            target.position,
            mapping.resource.asset.icon,
            `+${added}`,
          )
        }
      }
    }
  },
})
