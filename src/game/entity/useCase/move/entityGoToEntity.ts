import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"

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
  const meta = getMetaData<EntityMetaDataInterface>(entity)
  const speed = meta.propriety.speed ?? 0.01

  const targetPosition: Vector3Interface = target.position

  const direction = {
    x: targetPosition.x - entity.position.x,
    y: targetPosition.y - entity.position.y,
    z: targetPosition.z - entity.position.z,
  }

  const length = Math.sqrt(direction.x ** 2 + direction.z ** 2)

  const normalizedDirection = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length,
  }

  entity.position.x += normalizedDirection.x * speed
  entity.position.z += normalizedDirection.z * speed
  entity.position.y += normalizedDirection.y * speed

  entity.rotation = Math.atan2(normalizedDirection.x, normalizedDirection.z)

  const distance = distanceBetweenVector(entity.position, targetPosition)

  return {
    distance,
    isFinish: entityHasCollision(entity, target),
  }
}
