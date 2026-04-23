import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

export const fireballAttackActionResource = createActionResource({
  ["@id"]: "fireball-attack",
  onFrame: ({ game, entity }) => {
    if (!entity) {
      return
    }

    if (!entity.entityAttackTargetIri) {
      entity.life = 0
      return
    }

    const target = entityQueryFindOne(game, {
      "@id": entity.entityAttackTargetIri,
    })

    if (!target || target.life <= 0) {
      entity.life = 0
      return
    }

    entityGoToEntity({
      entity: entity,
      target,
    })

    if (entityHasCollision(entity, target)) {
      const meta = getResource<EntityResourceInterface>(entity)
      const damage = meta?.propriety.attack?.damage ?? 0
      target.life -= damage
      entity.life = 0
    }
  },
})
