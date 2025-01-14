import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function aroundVector(
  vector: Partial<Vector3Interface>,
  roundToMultiple: number = 0,
): Vector3Interface {
  if (roundToMultiple > 0) {
    function roundToNearestMultiple(value: number, multiple: number): number {
      return Math.round(value / multiple) * multiple
    }

    return {
      z: roundToNearestMultiple(vector.z ?? 0, roundToMultiple),
      y: roundToNearestMultiple(vector.y ?? 0, roundToMultiple),
      x: roundToNearestMultiple(vector.x ?? 0, roundToMultiple),
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
