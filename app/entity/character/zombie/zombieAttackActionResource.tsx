import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/packages/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/packages/game/entity/EntityState"
import { getResource } from "@/packages/resource/ResourceInterface"
import { entityGoToEntityWithGround } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { updateNextTick } from "@/packages/game/action/updateNextTick"

export const zombieAttackActionResource = createActionResource({
  ["@id"]: "action/zombie-attack",
  onFrame: ({ game, entity, action }) => {
    if (!entity) return
    const enemy = entityQueryFindOne(game, {
      "@id": entity.entityAttackTargetIri,
    })

    if (
      entity.state === EntityState.find_enemy ||
      entity.state === EntityState.wait
    ) {
      const newEnemy = entityQueryFindOne(game, {
        faction: EntityFaction.self,
        circleSearch: {
          center: entity.position,
          radius: 500,
        },
      })

      if (!newEnemy) {
        updateNextTick(game, action, 300)
        return
      }

      entity.entityAttackTargetIri = newEnemy["@id"]
      entity.state = EntityState.go_to_enemy
    }

    if (enemy && entity.state === EntityState.go_to_enemy) {
      entityGoToEntityWithGround({ game, entity: entity, target: enemy })

      if (entityCanBeAttackEntity(entity, enemy)) {
        entity.state = EntityState.attack
      }
    }

    if (enemy && entity.state === EntityState.attack) {
      const metaData = getResource<EntityResourceInterface>(entity)
      const attack = metaData?.propriety?.attack ?? 0
      if (!attack) return

      if (!entityAttackEntity(game, entity, enemy)) {
        entity.state = EntityState.go_to_enemy
      }

      updateNextTick(game, action, attack.attackSpeed)
    }
  },
})
