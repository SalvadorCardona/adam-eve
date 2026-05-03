import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import {
  entityQuery,
  entityQueryFindOne,
} from "@/packages/game/game/useCase/query/entityQuery"
import EntityInterface, {
  EntityFaction,
} from "@/packages/game/entity/EntityInterface"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/packages/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { spawnFloatingText } from "@/app/entity/effect/floatingText/FloatingTextEntityResource"

const SEARCH_RADIUS = 500
const IDLE_TICKS = 60

export const zombieAttackActionResource = createActionResource({
  ["@id"]: "action/zombie-attack",
  onFrame: ({ game, entity, action }) => {
    if (!entity) return
    const meta = getResource<EntityResourceInterface>(entity)
    const attack = meta?.propriety?.attack
    if (!attack) return

    let target: EntityInterface | undefined = entity.entityAttackTargetIri
      ? entityQueryFindOne(game, { "@id": entity.entityAttackTargetIri })
      : undefined

    if (!target || target.life <= 0) {
      entity.entityAttackTargetIri = undefined
      const candidates = entityQuery(game, {
        faction: EntityFaction.self,
        circleSearch: { center: entity.position, radius: SEARCH_RADIUS },
        order: { distance: "DESC" },
      }).filter((candidate) => candidate.life > 0)

      target = candidates[0]

      if (!target) {
        entity.state = EntityState.wait
        updateNextTick(game, action, IDLE_TICKS)
        return
      }

      entity.entityAttackTargetIri = target["@id"]
    }

    if (entityCanBeAttackEntity(entity, target)) {
      entity.state = EntityState.attack
      if (entityAttackEntity(game, entity, target)) {
        spawnFloatingText(game, target.position, undefined, `-${attack.damage}`)
      }
      updateNextTick(game, action, attack.attackSpeed)
      return
    }

    entity.state = EntityState.go_to_enemy
    entityGoToEntityWithGround({ game, entity, target })
  },
})
