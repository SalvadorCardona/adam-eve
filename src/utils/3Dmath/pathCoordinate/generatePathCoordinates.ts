import {
  Vector2Interface,
  vector2ToVector3,
  Vector3Interface,
} from "@/src/utils/3Dmath/Vector"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import EntityInterface from "@/src/game/entity/EntityInterface"

export type PathCoordinate = Vector2Interface[]

export interface CurrentPathCoordinateInterface {
  pathCoordinate: PathCoordinate
  currentCoordinate: number
  totalDistance: number
  isFinish: boolean
}

function roundToHalf(num: number) {
  return Math.round(num * 2) / 2
}

export function consommeCurrentPathCoordinate(entity: EntityInterface) {
  if (!entity.currentPathOfCoordinate) return

  const currentPathOfCoordinate = entity.currentPathOfCoordinate

  const nextCoordinate =
    currentPathOfCoordinate.pathCoordinate[currentPathOfCoordinate.currentCoordinate]
  if (!nextCoordinate) {
    entity.currentPathOfCoordinate.isFinish
    return
  }
  const nextCoordinateConverted = vector2ToVector3(nextCoordinate)

  const direction = {
    x: nextCoordinateConverted.x - entity.position.x,
    y: nextCoordinateConverted.y - entity.position.y,
    z: nextCoordinateConverted.z - entity.position.z,
  }

  // Normalize the direction vector
  const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
  const normalizedDirection = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length,
  }

  entity.rotation.y = Math.atan2(normalizedDirection.x, normalizedDirection.z)

  // Move the entity by 0.1 towards the next coordinate
  entity.position.x += normalizedDirection.x * (entity.speed / 2)
  entity.position.y += normalizedDirection.y * (entity.speed / 2)
  entity.position.z += normalizedDirection.z * (entity.speed / 2)

  // Check if the entity has reached the next coordinate
  if (length <= 0.1) {
    currentPathOfCoordinate.currentCoordinate++
  }

  entity.currentPathOfCoordinate.isFinish = currentPathCoordinateIsFinish(
    currentPathOfCoordinate,
  )

  return entity.currentPathOfCoordinate
}

export function currentPathCoordinateIsFinish(
  currentPathCoordinate: CurrentPathCoordinateInterface,
): boolean {
  return (
    currentPathCoordinate.pathCoordinate.length <=
    currentPathCoordinate.currentCoordinate
  )
}

/**
 * Permet de générer la route entre entité
 */
export function generatePathCoordinates(
  start: Vector3Interface,
  end: Vector3Interface,
  steps?: number,
): PathCoordinate {
  const currentSteps = steps ?? Math.round(distanceBetweenVector3(start, end) * 50)
  const path: Vector3Interface[] = []
  for (let i = 0; i <= currentSteps; i++) {
    const t = i / currentSteps
    const x = start.x + t * (end.x - start.x)
    const y = start.y + t * (end.y - start.y)
    const z = start.z + t * (end.z - start.z)
    path.push({ x, y, z })
  }

  return path
}
