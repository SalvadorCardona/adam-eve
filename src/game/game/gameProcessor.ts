import GameInterface from "@/src/game/game/GameInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { BuildingEntityInterface } from "@/src/game/entity/EntityInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { gameResource } from "@/src/game/game/gameResource"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { updateEntityInGame } from "@/src/game/game/useCase/command/updateEntityInGame"
import { getEntitiesInGame } from "@/src/game/game/useCase/query/getEntitiesInGame"
import { ActionResourceInterface } from "@/src/game/action/ActionResourceInterface"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = gameResource
  actionProcesseur(game.actions, game)

  getEntitiesInGame(game).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityResourceInterface
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
    const actionMeta = getMetaData<ActionResourceInterface>(action)
    actionMeta?.onFrame?.({ entity, action, game })

    if (entity) {
      updateEntityInGame(game, entity)
    }
  })
}
