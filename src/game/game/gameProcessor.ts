import GameInterface from "@/src/game/game/GameInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { GameMetadataInterface } from "@/src/game/game/GameMetaData"

export function gameProcessor(game: GameInterface) {
  game.time++
  const metaData = getMetaData<GameMetadataInterface>(game)
  Object.values(game.actions).forEach((action) => {
    const actionMeta = getMetaData(action) as ActionMetadataInterface<any>
    actionMeta.onFrame({ action, game })
  })

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })

    Object.values(entity.actions).forEach((action) => {
      const actionMeta = getMetaData(action) as ActionMetadataInterface<any>

      actionMeta.onFrame({ entity, action, game })
    })
  })

  metaData.persistItem(game)

  return game
}
