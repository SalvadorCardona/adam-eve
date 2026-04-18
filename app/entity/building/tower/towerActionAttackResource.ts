import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { arrowEntityResource } from "@/app/entity/attack/ArrowEntityResource"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { getEntitySize } from "@/packages/game/entity/useCase/query/getEntitySize"
import { createActionResource } from "@/packages/game/action/createActionResource"

import { updateNextTick } from "@/packages/game/action/updateNextTick"

export const towerAttackActionResource = createActionResource({
  ["@id"]: "action/tower-action",
  onFrame: ({ game, action, entity }) => {
    updateNextTick(game, action, 50)
    if (!entity) {
      return
    }

    const size = getEntitySize(entity)

    const zombie = entityQueryFindOne(game, {
      "@type": zombieEntityResource["@type"],
      findClosestOf: { position: entity.position },
      "@idIsNot": entity["@id"],
    })

    if (!zombie) {
      return
    }

    if (!entityCanBeAttackEntity(entity, zombie)) {
      return
    }

    const arrowEntity = arrowEntityResource.create({
      entity: {
        entityAttackTargetIri: zombie["@id"],
        position: { ...entity.position, y: size.y },
      },
      game,
    })

    addEntityToGame(game, arrowEntity)

    updateNextTick(game, action, 400)
  },
})
