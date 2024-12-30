export interface Vector2Interface {
  x: number
  y: number
}

export interface Vector3Interface extends Vector2Interface {
  z: number
}

export function vector3ToVector2(vector: Vector3Interface): Vector2Interface {
  return {
    x: vector.x,
    y: vector.z,
  }
}

export function vector2ToVector3(vector: Vector2Interface): Vector3Interface {
  return {
    x: vector.x,
    z: vector.y,
    y: 0,
  }
}

export function vector3ToArray(vector: Vector3Interface): [number, number, number] {
  return [vector.x, vector.y, vector?.z ?? 0]
}

export function areVectorsEqual(
  v1: Vector3Interface,
  v2: Vector3Interface,
): boolean {
  return v1.x === v2.x && v1.y === v2.y
}

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
