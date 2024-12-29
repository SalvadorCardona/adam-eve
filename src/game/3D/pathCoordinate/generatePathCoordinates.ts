import { MaybeVector3Interface, Vector3Interface } from "@/src/game/3D/Vector"
import { distanceBetweenVectors3 } from "@/src/game/3D/distanceBetweenVectors3"

export type PathCoordinate = Vector3Interface[]

/**
 * Permet de générer la route entre entité
 */
export function generatePathCoordinates(
  start: MaybeVector3Interface,
  end: MaybeVector3Interface,
  steps?: number,
): PathCoordinate {
  const currentSteps = steps ?? Math.round(distanceBetweenVectors3(start, end) * 50)
  const path: Vector3Interface[] = []
  for (let i = 0; i <= currentSteps; i++) {
    const t = i / currentSteps
    const x = start.x + t * (end.x - start.x)
    const y = start.y + t * (end.y - start.y)
    const z = (start.z ?? 0) + t * ((end.z ?? 0) - (start.z ?? 0))
    path.push({ x, y, z })
  }

  return path
}

