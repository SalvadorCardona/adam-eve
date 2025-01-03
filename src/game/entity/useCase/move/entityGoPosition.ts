import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3d } from "leva/plugin"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

interface EntityGoPositionParams {
  entity: EntityInterface
  target: Vector3d | EntityInterface
}

interface EntityGoPositionOutput {
  distance: number
}

export function entityGoPosition({
  entity,
  target,
}: EntityGoPositionParams): EntityGoPositionOutput {
  const meta = getMetaData<EntityMetaDataInterface>(entity)
  const speed = meta.propriety.speed ?? 0.01

  const targetPosition: Vector3Interface = Object.hasOwn(target, "position")
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

  entity.rotation = {
    x: Math.atan2(
      normalizedDirection.y,
      Math.sqrt(normalizedDirection.x ** 2 + normalizedDirection.z ** 2),
    ),
    y: Math.atan2(normalizedDirection.x, normalizedDirection.z),
    z: Math.atan2(normalizedDirection.y, normalizedDirection.x),
  }

  const distance = distanceBetweenVector3(entity.position, targetPosition)

  return {
    distance,
  }
}
