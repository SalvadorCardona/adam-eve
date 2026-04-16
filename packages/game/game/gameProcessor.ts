import GameInterface from "@/packages/game/game/GameInterface"
import { ActionBagInterface } from "@/packages/game/action/ActionBagInterface"
import { BuildingEntityInterface } from "@/packages/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { gameResource } from "@/packages/game/game/gameResource"
import { getResource } from "@/packages/resource/ResourceInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = gameResource
  actionProcesseur(game.actions, game)

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getResource(entity) as EntityResourceInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })
    entity?.actions &&
      actionProcesseur(entity.actions, game, entity as BuildingEntityInterface)
  })

  metaData.persistItem(game)

  return game
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
    actionMeta?.onFrame?.({ entity: entity, action, game })

    if (entity) {
      updateEntityInGame(game, entity)
    }
  })
}
