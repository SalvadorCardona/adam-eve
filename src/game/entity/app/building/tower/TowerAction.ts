import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { appLdType } from "@/src/AppLdType"
import { findClosest } from "@/src/utils/3Dmath/findClosest"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { ArrowEntityMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"

export const TowerAttackActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "TowerAttack"),
  onFrame: ({ game, action, entity }) => {
    action.nextTick = game.time + 50

    if (!entity) {
      return
    }

    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
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
      position: { ...entity.position, y: entityMetaData.propriety.size?.y ?? 0 },
    }

    const arrowEntity = ArrowEntityMetaData.factory({ entity: entityArg, game })
    addEntityToGame(game, arrowEntity)

    action.nextTick = game.time + 400
  },
  factory: () => {
    return jsonLdFactory(TowerAttackActionMetadata["@type"], {})
  },
}
