import { Vector2Interface } from "@/src/utils/math/Vector"
import { roundUpToBase } from "@/src/utils/math/aroundVector"

export function diviseVector2D(
  vectorStart: Vector2Interface,
  vectorEnd: Vector2Interface,
  divisionFactor: number = 1, // Ajout d'un paramètre pour le facteur de division
): Vector2Interface[] {
  const list: Vector2Interface[] = []

  const startX = roundUpToBase(vectorStart.x, divisionFactor)
  const startY = roundUpToBase(vectorStart.y, divisionFactor)
  const endX = roundUpToBase(vectorEnd.x, divisionFactor)
  const endY = roundUpToBase(vectorEnd.y, divisionFactor)

  for (let x = startX; x <= endX; x += divisionFactor) {
    for (let y = startY; y <= endY; y += divisionFactor) {
      list.push({ x: x, y: y })
    }
  }

  return list
}
