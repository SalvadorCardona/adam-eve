import GameInterface from "@/src/game/game/GameInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { GameMetadataInterface } from "@/src/game/game/GameMetaData"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { updateEntityInGame } from "@/src/game/entity/useCase/updateEntityInGame"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = getMetaData<GameMetadataInterface>(game)
  actionProcesseur(game.actions, game)

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })
    entity?.actions && actionProcesseur(entity.actions, game, entity)
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
    if (entity) {
      updateEntityInGame(game, entity)
    }
  })
}
