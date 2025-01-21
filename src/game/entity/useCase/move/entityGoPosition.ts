import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { getMetaData } from "@/src/game/game/app/getMetaData"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: Vector3Interface | EntityInterface
}

interface EntityGoPositionOutput {
  distance: number
  isFinish: boolean
}

const isEntityInterface = (
  e: Vector3Interface | EntityInterface,
): e is EntityInterface => {
  return Object.hasOwn(e, "position")
}

export function entityGoPosition({
  entity,
  target,
}: EntityGoPositionParams): EntityGoPositionOutput {
  const meta = getMetaData<EntityMetaDataInterface>(entity)
  const speed = meta.propriety.speed ?? 0.01

  const targetPosition: Vector3Interface = isEntityInterface(target)
    ? target.position
    : target

  const direction = {
    x: targetPosition.x - entity.position.x,
    y: targetPosition.y - entity.position.y,
    z: targetPosition.z - entity.position.z,
  }

  const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
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
    isFinish: distance < 50,
  }
}
