import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"

export type PathCoordinate = Vector3Interface[]

export interface CurrentPathCoordinate {
  pathCoordinate: PathCoordinate
  currentCoordinate: number
}

export function currentPathCoordinateIsFinish(
  currentPathCoordinate: CurrentPathCoordinate,
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
