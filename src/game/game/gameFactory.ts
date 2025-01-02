import GameInterface, { GameState } from "@/src/game/game/GameInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { gameCalculated } from "@/src/game/game/gameCalculated"

export function gameFactory(game?: GameInterface): GameInterface {
  const newGame = jsonLdFactory(appLdType.game, {
    gameSpeed: 1,
    gameState: GameState.RUN,
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
        y: 10,
        z: 0,
      },
      rotation: {
        x: -Math.PI / 4,
        y: 0,
        z: 0,
      },
    },
    userControl: {
      showGrid: true,
    },
    ...(game ?? {}),
  })

  newGame.gameCalculated = gameCalculated(newGame)

  return newGame
}
