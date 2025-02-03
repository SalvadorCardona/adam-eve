import { Vector2Interface } from "@/src/utils/math/vector"

interface rotationBetweenParams {}

interface rotationBetweenResult {}

export function rotationBetween(x: number, z: number): number {
  return Math.atan2(x, z)
}

export function rotationBetweenVector2(vector: Vector2Interface): number {
  return Math.atan2(vector.y, vector.x)
}
