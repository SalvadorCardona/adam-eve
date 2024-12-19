import GameInterface from "@/src/game/game/GameInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { persistLocalStorage } from "@/src/utils/localStorage/localStorage"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"

export function gameProcessor(game: GameInterface) {
  game.time++

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame && entityMetaData.onFrame({ entity, game })

    Object.values(entity.actions).forEach((action) => {
      const actionMeta = getMetaData(action) as ActionMetadataInterface<any>
      actionMeta.onFrame({ entity, action, game })
    })
  })

  persistLocalStorage("game", game)

  return game
}
