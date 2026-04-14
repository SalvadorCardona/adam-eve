import { createVector2, vector2ToVector3 } from "@/packages/math/vector"
import { gameFactory } from "@/packages/game/game/GameInterface"
import {
  getInMatrix,
  Matrix2DInterface,
  matrixToVector,
} from "@/packages/math/matrix"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { getResource } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { grassGroundEntityMetadata } from "@/packages/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { towerEntityResource } from "@/packages/game/entity/app/building/tower/towerEntityResource"

const groundsPosition: Matrix2DInterface = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
]

const buildingsPosition: Matrix2DInterface = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
]

const matrixExpected = [
  [0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
] as Matrix2DInterface

describe("Test gameEntitiesToMatrix", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const grassMeta = getResource<EntityResourceInterface>(grassGroundEntityMetadata)
    const grounds = matrixToVector(groundsPosition).map((position) =>
      grassMeta.factory({
        game,
        entity: {
          position: vector2ToVector3(position),
        },
      }),
    )
    const towerMeta = getResource<EntityResourceInterface>(towerEntityResource)
    const building = matrixToVector(buildingsPosition).map((position) =>
      towerMeta.factory({
        game,
        entity: {
          position: vector2ToVector3(position),
        },
      }),
    )

    const entities = [...grounds, ...building]
    entities.forEach((e) => addEntityToGame(game, e))
    const matrixGame = game.gameWorld.entitiesMatrix

    matrixGame.forEach((row, y) => {
      row.forEach((cell, x) => {
        const position = createVector2(x, y)
        const valueInEntitiesMatrix = getInMatrix(matrixGame, position)
        const valueInMatrixExpected = getInMatrix(matrixExpected, position)
        if (valueInMatrixExpected) {
          expect(typeof valueInEntitiesMatrix).toBe("string")
        } else {
          expect(valueInEntitiesMatrix).toBe(0)
        }
      })
    })
  })
})
