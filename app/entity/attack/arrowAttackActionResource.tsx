import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { createActionResource } from "@/packages/game/action/createActionResource"

export const arrowAttackActionResource = createActionResource({
  ["@id"]: "arrow-attack",
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

    if (entityAttackEntity(game, entity, target)) {
      entity.life = 0
    }
  },
})
