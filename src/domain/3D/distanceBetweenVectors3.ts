import { Vector3Interface } from "@/src/domain/3D/Vector"

export function distanceBetweenVectors3(
  v1: Vector3Interface,
  v2: Vector3Interface,
): number {
  const dx = v1.x - v2.x
  const dy = v1.y - v2.y
  const dz = v1.z - v2.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}
