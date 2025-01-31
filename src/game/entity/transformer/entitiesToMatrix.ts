import EntityInterface from "@/src/game/entity/EntityInterface"
import { generateMatrix, MatrixInterface } from "@/src/utils/math/matrix"
import { entityToBoundingBox } from "@/src/game/entity/transformer/entityToBoundingBox"

export function entitiesToMatrix(entities: EntityInterface[]): MatrixInterface {
  const entitiesConverted = entities.map((entity) => {
    return entityToBoundingBox(entity)
  })

  return generateMatrix(entitiesConverted)
}
