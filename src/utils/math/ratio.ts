import {
  Vector2Interface,
  Vector3Interface,
  vectorTransformer,
} from "@/src/utils/math/Vector"

export function ratioUP(some: number, multiplication: number = 1): number {
  return some * multiplication
}

export function ratioDown(some: number, multiplication: number = 1): number {
  return some / multiplication
}

export function vectorRatioUP<T extends Vector2Interface | Vector3Interface>(
  vector: T,
  multiplication: number = 1,
): T {
  return vectorTransformer<T>(vector, (e) => ratioUP(e, multiplication))
}

export function vectorRatioDown<T extends Vector2Interface | Vector3Interface>(
  vector: T,
  multiplication: number = 1,
): T {
  return vectorTransformer<T>(vector, (e) => ratioDown(e, multiplication))
}
