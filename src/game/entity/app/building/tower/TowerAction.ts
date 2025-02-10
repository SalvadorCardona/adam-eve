import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { ArrowEntityMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { getEntitySize } from "@/src/game/entity/useCase/query/getEntitySize"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"

import { updateNextTick } from "@/src/game/action/updateNextTick"

export const towerAttackActionMetadata = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "TowerAttack"),
  onFrame: ({ game, action, entity }) => {
    updateNextTick(game, action, 50)
    if (!entity) {
      return
    }

    const size = getEntitySize(entity)

    const zombie = entityQueryFindOne(game, {
      "@type": zombieEntityMetaData["@type"],
      findClosestOf: { position: entity.position },
      "@idIsNot": entity["@id"],
    })

    if (!zombie) {
      return
    }

    if (!entityCanBeAttackEntity(entity, zombie)) {
      return
    }

    const arrowEntity = ArrowEntityMetaData.factory({
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
