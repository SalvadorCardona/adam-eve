import GameInterface from "@/app/domain/game/GameInterface"
import { getMetaData } from "@/app/game/configGame"
import { persistLocalStorage } from "@/packages/utils/localStorage/localStorage"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/app/domain/action/ActionMetadataInterface"

export function gameProcessor(game: GameInterface) {
  game.time++

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
    entityMetaData.onFrame({ entity, game })

    Object.values(entity.actions).forEach((action) => {
      const actionMeta = getMetaData(action) as ActionMetadataInterface<any>
      actionMeta.onFrame({ entity, action, game })
    })
  })

  persistLocalStorage("game", game)

  return game
}
