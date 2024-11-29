export interface Vector2Interface {
  x: number
  y: number
}

export interface Vector3Interface {
  x: number
  y: number
  z: number
}

export function Vector2Factory(vector: Partial<Vector2Interface>): Vector2Interface {
  return {
    x: 0,
    y: 0,
    ...vector
  }
}

export function Vector3Factory(vector: Partial<Vector3Interface>): Vector3Interface {
  return {
    x: 0,
    y: 0,
    z: 0,
    ...vector
  }
}

export function vector3ToArray(vector: Vector3Interface | Vector2Interface): [number, number, number] {
  return [vector.x, vector.y, vector?.z ?? 0]
}
