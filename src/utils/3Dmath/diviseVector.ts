import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function diviseVector(
  vector3Start: Vector3Interface,
  vectorEnd: Vector3Interface,
  divisionFactor: number = 1, // Ajout d'un paramètre pour le facteur de division
): Vector3Interface[] {
  const list: Vector3Interface[] = []

  const startX = Math.floor(vector3Start.x / divisionFactor)
  const startZ = Math.floor(vector3Start.z / divisionFactor)
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
