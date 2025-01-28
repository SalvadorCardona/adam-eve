import { Vector3Interface } from "@/src/utils/math/Vector"
import { distanceBetweenVector } from "@/src/utils/math/distanceBetweenVector"
import { aroundDecimal } from "@/src/utils/math/roundVectorToDown"

export interface VectorMoveToVectorReturnInterface {
  position: Vector3Interface
  distance: number
  isFinish: boolean
  rotation: number
}

export function vectorMoveToVector(
  vectorSource: Vector3Interface,
  vectorTarget: Vector3Interface,
  distance: number = 1,
): VectorMoveToVectorReturnInterface {
  const response: VectorMoveToVectorReturnInterface = {
    position: vectorTarget,
    distance: 0,
    isFinish: false,
    rotation: 0,
  }

  const direction = {
    x: vectorTarget.x - vectorSource.x,
    y: vectorTarget.y - vectorSource.y,
    z: vectorTarget.z - vectorSource.z,
  } as Vector3Interface

  const length = Math.sqrt(direction.x ** 2 + direction.z ** 2)

  if (length === 0) {
    response.isFinish = true
    return response
  }

  const newPosition = {
    x: vectorSource.x + (direction.x / length) * distance,
    y: vectorSource.y + (direction.y / length) * distance,
    z: vectorSource.z + (direction.z / length) * distance,
  }

  return {
    distance: distanceBetweenVector(newPosition, vectorTarget),
    isFinish: length === 0,
    position: newPosition,
    rotation: aroundDecimal(Math.atan2(newPosition.x, newPosition.z)),
  }
}
