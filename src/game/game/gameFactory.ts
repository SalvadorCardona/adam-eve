import GameInterface from "@/src/game/game/GameInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"

export function gameFactory(game?: GameInterface): GameInterface {
  const newGame = jsonLdFactory("game", {
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    createdAt: new Date(),
    camera: {
      fov: 50,
      zoom: 0,
      position: {
        x: 0,
        y: -10,
        z: 10,
      },
      rotation: {
        x: 0.5,
        y: 0,
        z: 0,
      },
    },
    userControl: {
      showGrid: true,
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
