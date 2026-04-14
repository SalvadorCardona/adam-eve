import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { actionResourceFactory } from "@/packages/game/action/actionResourceFactory"

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
