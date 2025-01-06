import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { appLdType } from "@/src/AppLdType"
import { findClosestInGame } from "@/src/utils/3Dmath/findClosest"
import { zombieEntityMetaData } from "@/src/game/entity/app/character/zombie/zombieEntity"
import { ArrowMetaData } from "@/src/game/entity/app/attack/ArrowEntity"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityCanBeAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"

export const TowerAttackActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "TowerAttack"),
  onFrame: ({ game, action, entity }) => {
    action.nextTick = game.time + 50

    if (!entity) {
      return
    }
    const zombie = findClosestInGame(entity, zombieEntityMetaData["@type"], game)
    if (!zombie) {
      return
    }

    if (!entityCanBeAttackEntity(entity, zombie)) {
      return
    }

    const entityArg: Partial<EntityInterface> = {
      entityAttackTargetIri: zombie["@id"],
      position: { ...entity.position, y: entity.size.y },
    }

    const arrowEntity = ArrowMetaData.factory({ entity: entityArg, game })
    addEntityToGame(game, arrowEntity)

    action.nextTick = game.time + 400
  },
  factory: () => {
    return jsonLdFactory(TowerAttackActionMetadata["@type"], {})
  },
}
