import EntityInterface from "@/src/game/entity/EntityInterface"
import { BoundingInterface, createBoundingByABB } from "@/packages/math/boudingBox"
import {
  Vector2Interface,
  vector3ToVector2,
  vectorAddition,
} from "@/packages/math/vector"
import { getEntitySize } from "@/src/game/entity/useCase/query/getEntitySize"

export function entityToBoundingBox(entity: EntityInterface): BoundingInterface {
  const size = getEntitySize(entity)
  const min = vector3ToVector2(entity.position)

  return createBoundingByABB({
    min,
    max: vectorAddition<Vector2Interface>(min, size),
    id: entity["@id"],
  })
}
