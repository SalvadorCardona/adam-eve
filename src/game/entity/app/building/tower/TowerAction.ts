import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { appLdType } from "@/src/AppLdType"
import { findClosest } from "@/src/utils/math/findClosest"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { ArrowEntityMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { getEntitySize } from "@/src/game/entity/useCase/query/getEntitySize"

export const TowerAttackActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "TowerAttack"),
  onFrame: ({ game, action, entity }) => {
    action.nextTick = game.time + 50

    if (!entity) {
      return
    }

    const size = getEntitySize(entity)
    const zombies = entityQuery(game, { "@type": zombieEntityMetaData["@type"] })
    const zombie = findClosest(entity, zombies)

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

    action.nextTick = game.time + 400
  },
  factory: () => {
    return jsonLdFactory(TowerAttackActionMetadata["@type"], {})
  },
}
