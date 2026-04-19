import { createActionResource } from "@/packages/game/action/createActionResource"
import { keysPressed } from "@/packages/ui/keysState"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/packages/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/packages/game/entity/EntityState"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

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

    const target = entityQueryFindOne(game, {
      faction: EntityFaction.enemy,
      circleSearch: {
        center: entity.position,
        radius: 10,
      },
    })

    if (!target) {
      entity.state = EntityState.wait
      return
    }

    if (entityCanBeAttackEntity(entity, target)) {
      const metaData = getResource<EntityResourceInterface>(entity)
      const attack = metaData?.propriety?.attack
      if (!attack) return

      entityAttackEntity(game, entity, target)
      updateNextTick(game, action, attack.attackSpeed)
    }
  },
})
