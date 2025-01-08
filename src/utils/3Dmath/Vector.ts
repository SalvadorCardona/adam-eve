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

export function arrayToVector3(array: [number, number, number]): Vector3Interface {
  return { x: array[0], y: array[1], z: array[2] }
}

export function areVectorsEqual(
  v1: Vector3Interface,
  v2: Vector3Interface,
): boolean {
  return v1.x === v2.x && v1.z === v2.z
}

export function isVector3(
  vector: Vector2Interface | Vector3Interface,
): vector is Vector3Interface {
  return Object.hasOwn(vector, "z")
}

export function isVector2(
  vector: Vector2Interface | Vector3Interface,
): vector is Vector3Interface {
  return !Object.hasOwn(vector, "z")
}
