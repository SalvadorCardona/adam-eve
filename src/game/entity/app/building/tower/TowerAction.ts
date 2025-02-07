import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { findClosestEntity } from "@/src/game/game/useCase/query/findClosestEntity"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { ArrowEntityMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
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
    const zombies = entityQuery(game, { "@type": zombieEntityMetaData["@type"] })
    const zombie = findClosestEntity(entity, zombies)

    if (!zombie) {
      return
    }

    if (!entityCanBeAttackEntity(entity, zombie)) {
      return
    }

    const entityArg: Partial<EntityInterface> = {
      entityAttackTargetIri: zombie["@id"],
      position: { ...entity.position, y: size.y },
    }

    const arrowEntity = ArrowEntityMetaData.factory({ entity: entityArg, game })
    addEntityToGame(game, arrowEntity)

    updateNextTick(game, action, 400)
  },
})
