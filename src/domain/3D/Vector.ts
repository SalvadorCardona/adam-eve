export interface Vector2Interface {
  x: number
  y: number
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

export function vector3ToArray(vector: Vector3Interface): [number, number, number] {
  return [vector.x, vector.y, vector?.z ?? 0]
}

export function areVectorsEqual(
  v1: Vector3Interface,
  v2: Vector3Interface,
): boolean {
  return v1.x === v2.x && v1.y === v2.y && (v1.z ?? 0) === (v2.z ?? 0)
}
