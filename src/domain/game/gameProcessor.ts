import GameInterface from "@/src/domain/game/GameInterface"
import { getMetaData } from "@/src/game/configGame"
import { persistLocalStorage } from "@/packages/utils/localStorage/localStorage"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/src/domain/action/ActionMetadataInterface"

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
