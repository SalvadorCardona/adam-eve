import {
  Vector2Interface,
  vector2ToVector3,
  Vector3Interface,
} from "@/src/utils/3Dmath/Vector"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export type PathCoordinate = Vector2Interface[]

export interface CurrentPathCoordinateInterface {
  pathCoordinate: PathCoordinate
  currentCoordinate: number
  totalDistance: number
  isFinish: boolean
  unreachable: boolean
  hash: string
}

export function consommeCurrentPathCoordinate(entity: EntityInterface) {
  if (!entity.currentPathOfCoordinate) return
  const meta = getMetaData<EntityMetaDataInterface>(entity)
  const speed = meta.propriety.speed ?? 0.01
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

  const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
  const normalizedDirection = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length,
  }

  entity.rotation.y = Math.atan2(normalizedDirection.x, normalizedDirection.z)

  // Move the entity by 0.1 towards the next coordinate
  entity.position.x += normalizedDirection.x * speed
  entity.position.z += normalizedDirection.z * speed

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
  const currentSteps = steps ?? Math.round(distanceBetweenVector(start, end) * 50)
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
