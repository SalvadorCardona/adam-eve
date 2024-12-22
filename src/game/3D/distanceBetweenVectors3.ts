import { MaybeVector3Interface } from "@/src/game/3D/Vector"

export function distanceBetweenVectors3(
  v1: MaybeVector3Interface,
  v2: MaybeVector3Interface,
): number {
  const dx = v1.x - v2.x
  const dy = v1.y - v2.y
  if (v1.z && v2.z) {
    const dz = v1.z - v2.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  return Math.sqrt(dx * dx + dy * dy)
}
