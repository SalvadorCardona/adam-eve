import EntityInterface from "@/src/game/entity/EntityInterface"
import { createMatrixByBounding, Matrix2DInterface } from "@/src/utils/math/matrix"
import { entityToBoundingBox } from "@/src/game/entity/transformer/entityToBoundingBox"

export function entitiesToMatrix(entities: EntityInterface[]): Matrix2DInterface {
  const entitiesConverted = entities.map((entity) => {
    return entityToBoundingBox(entity)
  })

  return createMatrixByBounding(entitiesConverted)
}
