import EntityInterface from "@/packages/game/entity/EntityInterface"
import { createMatrixByBounding, Matrix2DInterface } from "@/packages/math/matrix"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"

export function entitiesToMatrix(entities: EntityInterface[]): Matrix2DInterface {
  const entitiesConverted = entities.map((entity) => {
    return entityToBoundingBox(entity)
  })

  return createMatrixByBounding(entitiesConverted)
}
