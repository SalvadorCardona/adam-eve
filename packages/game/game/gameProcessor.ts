import GameInterface from "@/packages/game/game/GameInterface"
import { ActionBagInterface } from "@/packages/game/action/ActionBagInterface"
import EntityInterface, {
  BuildingEntityInterface,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/resource/ResourceInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

export function gameProcessor(game: GameInterface) {
  game.time++

  actionProcesseur(game.actions, game)

  Object.values(game.entities).forEach((entity) => {
    if (isGroundEntity(entity)) return
    const entityMetaData = getResource(entity) as EntityResourceInterface | undefined

    entityMetaData?.onFrame?.({ entity, game })
    entity?.actions &&
      actionProcesseur(entity.actions, game, entity as BuildingEntityInterface)
  })

  return game
}

function entityVisualHash(entity: EntityInterface): string {
  return (
    entity.position.x +
    "|" +
    entity.position.y +
    "|" +
    entity.position.z +
    "|" +
    (entity.state ?? "") +
    "|" +
    entity.rotation +
    "|" +
    entity.life +
    "|" +
    (entity.hidden ? 1 : 0)
  )
}

function actionProcesseur(
  actionBag: ActionBagInterface,
  game: GameInterface,
  entity?: BuildingEntityInterface,
): void {
  Object.values(actionBag).forEach((action) => {
    if (action?.nextTick && action.nextTick > game.time) {
      return
    }

    action.nextTick = undefined
    const actionMeta = getResource<ActionResourceInterface>(action)

    if (!entity) {
      actionMeta?.onFrame?.({ entity, action, game })
      return
    }

    const before = entityVisualHash(entity)
    actionMeta?.onFrame?.({ entity, action, game })

    if (entityVisualHash(entity) !== before) {
      updateEntityInGame(game, entity)
    }
  })
}
