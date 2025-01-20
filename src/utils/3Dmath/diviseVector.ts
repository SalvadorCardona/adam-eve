import { Vector2Interface, Vector3Interface } from "@/src/utils/3Dmath/Vector"
import { roundUpToBase } from "@/src/utils/3Dmath/aroundVector"

export function diviseVector(
  vectorStart: Vector3Interface,
  vectorEnd: Vector3Interface,
  divisionFactor: number = 1, // Ajout d'un paramètre pour le facteur de division
): Vector3Interface[] {
  const list: Vector3Interface[] = []

  const startX = Math.floor(vectorStart.x / divisionFactor)
  const startZ = Math.floor(vectorStart.z / divisionFactor)
  const endX = Math.ceil(vectorEnd.x / divisionFactor)
  const endZ = Math.ceil(vectorEnd.z / divisionFactor)

  const y = 0
  for (let x = startX; x < endX; x++) {
    for (let z = startZ; z < endZ; z++) {
      list.push({ x: x * divisionFactor, y, z: z * divisionFactor })
    }
  }

  return list
}

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
