import GameInterface from "@/src/game/game/GameInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"

export function gameFactory(game?: GameInterface): GameInterface {
  const newGame = jsonLdFactory("game", {
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    createdAt: new Date(),
    userControl: {
      entitySelection: undefined,
      entityShouldBeCreated: undefined,
    },
    ...(game ?? {}),
  })

  _currentGame = newGame

  return newGame
}

let _currentGame: undefined | GameInterface = undefined

export const currentGame = () => {
  if (!_currentGame) _currentGame = gameFactory()

  return _currentGame
}
