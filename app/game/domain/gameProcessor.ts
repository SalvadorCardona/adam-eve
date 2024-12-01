import GameInterface from "@/app/game/domain/GameInterface"
import configGame from "@/app/game/config/configGame"
import { persistLocalStorage } from "@/packages/utils/localStorage/localStorage"
import { EntityMetaDataInterface } from "@/app/game/domain/entity/EntityMetaDataInterface"
import { ActionMetadataInterface } from "@/app/game/domain/action/ActionMetadataInterface"

export function gameProcessor(game: GameInterface) {
  game.time++

  Object.values(game.entities).forEach((entity) => {
    const entityMetaData = configGame[entity["@type"]] as EntityMetaDataInterface
    entityMetaData.onFrame({ entity, game })

    Object.values(entity.actions).forEach((action) => {
      const actionMeta = configGame[action["@type"]] as ActionMetadataInterface<any>
      actionMeta.onFrame({ entity, action, game })
    })
  })

  persistLocalStorage("game", game)

  return game
}
