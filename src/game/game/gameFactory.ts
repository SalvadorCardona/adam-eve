import GameInterface, {
  GameMode,
  GameState,
  GraphicMotor,
} from "@/src/game/game/GameInterface"
import { jsonLdFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { createGameCalculated } from "@/src/game/game/createGameCalculated"
import { createBounding3D } from "@/src/utils/3Dmath/boudingBox"

export function gameFactory(game?: GameInterface): GameInterface {
  const newGame = jsonLdFactory(appLdType.game, {
    graphicMotor: GraphicMotor.PIXI_JS,
    gameSpeed: 1,
    gameState: GameState.RUN,
    gameMode: GameMode.NORMAL,
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
      entitiesSelected: [],
      showGrid: true,
      mouseState: {
        bounding3D: createBounding3D(),
      },
    },
    ...(game ?? {}),
  })

  newGame.gameCalculated = createGameCalculated(newGame)

  return newGame
}
