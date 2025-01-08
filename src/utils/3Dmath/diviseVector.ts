import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function diviseVector(
  vector3Start: Vector3Interface,
  vectorEnd: Vector3Interface,
): Vector3Interface[] {
  const list: Vector3Interface[] = []

  const startX = Math.floor(vector3Start.x)
  // const startY = Math.floor(vector3Start.y)
  const startZ = Math.floor(vector3Start.z)
  const endX = Math.ceil(vectorEnd.x)
  // const endY = Math.ceil(vectorEnd.y)
  const endZ = Math.ceil(vectorEnd.z)
  const y = 0
  for (let x = startX; x < endX; x++) {
    for (let z = startZ; z < endZ; z++) {
      list.push({ x, y, z })
    }
  }

  return list
}
