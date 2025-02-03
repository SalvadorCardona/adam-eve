import { Vector2Interface } from "@/src/utils/math/vector"
import { roundDownToBase } from "@/src/utils/math/round"

export function diviseVector2D(
  vectorStart: Vector2Interface,
  vectorEnd: Vector2Interface,
  divisionFactor: number = 1, // Ajout d'un paramètre pour le facteur de division
): Vector2Interface[] {
  const list: Vector2Interface[] = []

  const startX = roundDownToBase(
    Math.min(vectorStart.x, vectorEnd.x),
    divisionFactor,
  )
  const startY = roundDownToBase(
    Math.min(vectorStart.y, vectorEnd.y),
    divisionFactor,
  )

  const endX = roundDownToBase(Math.max(vectorStart.x, vectorEnd.x), divisionFactor)
  const endY = roundDownToBase(Math.max(vectorStart.y, vectorEnd.y), divisionFactor)

  for (let x = startX; x <= endX; x += divisionFactor) {
    for (let y = startY; y <= endY; y += divisionFactor) {
      list.push({ x: x, y: y })
    }
  }

  return list
}
