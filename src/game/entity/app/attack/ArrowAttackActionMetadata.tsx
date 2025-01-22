import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { entityGoToEntity } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"

export const ArrowAttackActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "ArrowAttack"),
  onFrame: ({ game, entity }) => {
    if (!entity || !entity.entityAttackTargetIri) {
      return
    }

    const zombie = game.entities[entity.entityAttackTargetIri]
    if (!zombie) {
      removeEntityToGame(game, entity)
      return
    }

    entityGoToEntity({
      entity,
      target: zombie,
    })

    if (entityAttackEntity(entity, zombie)) {
      removeEntityToGame(game, entity)
    }
  },
  factory: () => {
    return jsonLdFactory(ArrowAttackActionMetadata["@type"], {})
  },
}
