import { Vector2Interface } from "@/src/utils/math/vector"

export const heuristic = (vector1: Vector2Interface, vector2: Vector2Interface) =>
  Math.abs(vector1.x - vector2.x) + Math.abs(vector1.y - vector2.y)