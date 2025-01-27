import { Vector2Interface, Vector3Interface } from "@/src/utils/math/Vector"

export function distanceBetweenVector(
  v1: Vector3Interface,
  v2: Vector3Interface,
): number {
  const dx = v1.x - v2.x
  const dy = v1.y - v2.y
  const dz = v1.z - v2.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function distanceBetweenVector2(
  v1: Vector2Interface,
  v2: Vector2Interface,
): number {
  const dx = v1.x - v2.x
  const dy = v1.y - v2.y
  return Math.sqrt(dx * dx + dy * dy)
}
