import GameInterface from "@/src/game/game/GameInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { GameMetadataInterface } from "@/src/game/game/GameMetaData"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = getMetaData<GameMetadataInterface>(game)
  actionProcesseur(game.actions, game)

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })
    actionProcesseur(entity.actions, game, entity)
  })

  metaData.persistItem(game)

  return game
}

function actionProcesseur(
  actionBag: ActionBagInterface,
  game: GameInterface,
  entity?: EntityInterface,
): void {
  Object.values(actionBag).forEach((action) => {
    if (action?.nextTick && action.nextTick > game.time) {
      return
    }

    action.nextTick = undefined
    const actionMeta = getMetaData(action) as ActionMetadataInterface<any>
    actionMeta.onFrame({ entity, action, game })
  })
}
