import { entityGoToEntity } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { actionResourceFactory } from "@/src/game/action/actionResourceFactory"

export const arrowAttackActionResource = actionResourceFactory({
  ["@id"]: "action/arrow-attack",
  onFrame: ({ game, entity }) => {
    if (!entity) {
      return
    }
    const zombie = entityQueryFindOne(game, { "@id": entity.entityAttackTargetIri })

    if (!zombie) {
      entity.life = 0
      return
    }

    entityGoToEntity({
      entity,
      target: zombie,
    })

    if (entityAttackEntity(game, entity, zombie)) {
      entity.life = 0
    }
  },
})
