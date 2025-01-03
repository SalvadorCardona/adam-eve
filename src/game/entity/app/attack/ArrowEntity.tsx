import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageSource from "./arrow.glb?url"
import { appLdType } from "@/src/AppLdType"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { addAction } from "@/src/game/action/addAction"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { removeEntityToGame } from "@/src/game/entity/useCase/removeEntityToGame"
import { entityGoPosition } from "@/src/game/entity/useCase/move/entityGoPosition"
import { entityAttackEntity } from "@/src/game/entity/useCase/entityAttackEntity"

export const ArrowMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
  },
  propriety: {
    attack: {
      attackRange: 0.1,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 0.05,
  },
  label: "Tour de défense",
  ["@type"]: JsonLdTypeFactory(appLdType.action, "Arrow"),
  defaultEntity: () => {
    const action = ArrowAttackActionMetadata.factory()
    const actionBag: ActionBagInterface = {}

    addAction(actionBag, action)
    return {
      actions: actionBag,
      numberOfWorker: 2,
      size: {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      },
    }
  },
})

export const ArrowAttackActionMetadata: ActionMetadataInterface<any> = {
  ["@type"]: JsonLdTypeFactory(appLdType.action, "ArrowAttack"),
  onFrame: ({ game, entity }) => {
    if (!entity || !entity.entityAttackTargetIri) {
      return
    }

    const zombie = game.entities[entity.entityAttackTargetIri]
    if (!zombie) {
      removeEntityToGame(game, entity)
      return
    }

    entityGoPosition({
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
