import { Vector3Interface } from "@/app/domain/3D/Vector"

export type PathCoordinate = Vector3Interface[]

/**
 * Permet de générer la route entre entité
 */
export function generatePathCoordinates(
  start: Vector3Interface,
  end: Vector3Interface,
  steps: number,
): PathCoordinate {
  const path: Vector3Interface[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = start.x + t * (end.x - start.x)
    const y = start.y + t * (end.y - start.y)
    const z = start.z + t * (end.z - start.z)
    path.push({ x, y, z })
  }

  return path
}
