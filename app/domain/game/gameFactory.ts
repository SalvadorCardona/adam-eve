import GameInterface from "@/app/domain/game/GameInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"

export function gameFactory(game?: GameInterface): GameInterface {
  const newGame = jsonLdFactory("game", {
    entitySelection: undefined,
    entityShouldBeCreated: undefined,
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    ...(game ?? {}),
  })

  privateCurrentGame = newGame

  return newGame
}

let privateCurrentGame: undefined | GameInterface = undefined

export const currentGame = () => {
  if (!privateCurrentGame) privateCurrentGame = gameFactory()

  return privateCurrentGame
}
