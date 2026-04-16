import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { createActionResource } from "@/packages/game/action/createActionResource"

export const arrowAttackActionResource = createActionResource({
  ["@id"]: "action/arrow-attack",
  onFrame: ({ game, entity }) => {
    if (!entity) {
      return
    }

    const zombie = entityQueryFindOne(game, {
      entityType: entity,
    })

    if (!zombie) {
      entity.life = 0
      return
    }

    entityGoToEntity({
      entity: entity,
      target: zombie,
    })

    if (entityAttackEntity(game, entity, zombie)) {
      entity.life = 0
    }
  },
})
