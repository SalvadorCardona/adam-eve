import { entitiesToMatrix } from "@/src/game/entity/transformer/entitiesToMatrix"
import { createVector2, vector2ToVector3 } from "@/src/utils/math/vector"
import { gameFactory } from "@/src/game/game/GameInterface"
import {
  getInMatrix,
  Matrix2DInterface,
  matrixToVector,
} from "@/src/utils/math/matrix"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
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
    const entityMetadata = getMetaData<EntityMetaDataInterface>(
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
