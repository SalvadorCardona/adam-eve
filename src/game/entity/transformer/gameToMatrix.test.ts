import { createVector2, vector2ToVector3 } from "@/src/utils/math/vector"
import { gameFactory } from "@/src/game/game/GameInterface"
import {
  getInMatrix,
  Matrix2DInterface,
  matrixToVector,
} from "@/src/utils/math/matrix"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { towerEntityMetaData } from "@/src/game/entity/app/building/tower/TowerEntity"

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
    const grassMeta = getMetaData<EntityMetaDataInterface>(grassGroundEntityMetadata)
    const grounds = matrixToVector(groundsPosition).map((position) =>
      grassMeta.factory({
        game,
        entity: {
          position: vector2ToVector3(position),
        },
      }),
    )
    const towerMeta = getMetaData<EntityMetaDataInterface>(towerEntityMetaData)
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
