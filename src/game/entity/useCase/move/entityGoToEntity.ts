import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/src/utils/math/vector"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { vectorMoveToVector } from "@/src/utils/math/vectorMoveToVector"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: EntityInterface
}

interface EntityGoPositionOutput {
  distance: number
  isFinish: boolean
}

export function entityGoToEntity({
  entity,
  target,
}: EntityGoPositionParams): EntityGoPositionOutput {
  const targetPosition: Vector3Interface = target.position
  const entityPosition: Vector3Interface = entity.position
  const result = vectorMoveToVector(entityPosition, targetPosition, 1.5)

  entity.position = result.position
  entity.rotation = result.rotation
  return {
    distance: result.distance,
    isFinish: entityHasCollision(entity, target),
  }
}
