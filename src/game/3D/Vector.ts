export interface Vector2Interface {
  x: number
  y: number
}

export interface MaybeVector3Interface extends Vector2Interface {
  z?: number
}

export interface Vector3Interface extends Vector2Interface {
  z: number
}

export function Vector2Factory(vector: Partial<Vector2Interface>): Vector2Interface {
  return {
    x: 0,
    y: 0,
    ...vector,
  }
}

export function Vector3Factory(vector: Partial<Vector3Interface>): Vector3Interface {
  return {
    x: 0,
    y: 0,
    z: 0,
    ...vector,
  }
}

export function vector3ToArray(
  vector: Vector3Interface | MaybeVector3Interface,
): [number, number, number] {
  return [vector.x, vector.y, vector?.z ?? 0]
}

export function areVectorsEqual(
  v1: Vector3Interface | MaybeVector3Interface,
  v2: Vector3Interface | MaybeVector3Interface,
): boolean {
  if (v1.z && v2.z) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
  }

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
