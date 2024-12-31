import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function aroundVector(
  vector: Partial<Vector3Interface>,
  aroundNearHalf: boolean = false,
): Vector3Interface {
  if (!aroundNearHalf) {
    return {
      z: Math.round(vector.z ?? 0),
      y: Math.round(vector.y ?? 0),
      x: Math.round(vector.x ?? 0),
    }
  }

  function roundToNearestHalf(value: number): number {
    return Math.round(value * 2) / 2
  }

  return {
    z: roundToNearestHalf(vector.z ?? 0),
    y: roundToNearestHalf(vector.y ?? 0),
    x: roundToNearestHalf(vector.x ?? 0),
  }
}
