import { entitiesToMatrix } from "@/src/game/entity/transformer/entitiesToMatrix"
import { createVector2, vector2ToVector3 } from "@/packages/math/vector"
import { gameFactory } from "@/src/game/game/GameInterface"
import {
  getInMatrix,
  Matrix2DInterface,
  matrixToVector,
} from "@/packages/math/matrix"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"

const entitiesPosition: Matrix2DInterface = [
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
]

const matrixExpected = [
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
] as Matrix2DInterface

describe("Test gameEntitiesToMatrix", () => {
  it("Context 1", () => {
    const entityMetadata = getMetaData<EntityResourceInterface>(
      grassGroundEntityMetadata,
    )

    const entities = matrixToVector(entitiesPosition).map((position) =>
      entityMetadata.factory({
        game: gameFactory(),
        entity: {
          position: vector2ToVector3(position),
        },
      }),
    )
    const entitiesMatrix = entitiesToMatrix(entities)
    entitiesMatrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        const position = createVector2(x, y)
        const valueInEntitiesMatrix = getInMatrix(entitiesMatrix, position)
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
