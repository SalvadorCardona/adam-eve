export interface Vector2Interface {
  x: number
  y: number
}

export interface Vector3Interface extends Vector2Interface {
  z: number
}

export function createVector2(x: number = 0, y: number = 0): Vector2Interface {
  return {
    x,
    y,
  }
}

export function createVector3(
  x: number = 0,
  y: number = 0,
  z: number,
): Vector3Interface {
  return {
    x,
    y,
    z,
  }
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
    y: 0,
    z: vector.y,
  }
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
): vector is Vector2Interface {
  return !isVector3(vector)
}

export function vectorTransformer<T extends Vector2Interface | Vector3Interface>(
  vector: T,
  cb: (s: number) => number,
): T {
  const result: Partial<T> = {}

  Object.keys(vector).forEach((key) => {
    // @ts-ignore
    result[key as keyof T] = cb(vector[key as keyof T]) as T[keyof T]
  })

  return result as T
}

export function vectorAddition<T extends Vector2Interface | Vector3Interface>(
  v1: T,
  v2: T,
) {
  const result: Partial<T> = {}

  Object.keys(v1).forEach((key) => {
    // @ts-ignore
    result[key as keyof T] = v1[key] + v2[key]
  })

  return result as T
}

export const vectorSize = (
  min: Vector2Interface,
  max: Vector2Interface,
): Vector2Interface => {
  const width = Math.abs(max.x - min.x)
  const height = Math.abs(max.y - min.y)

  return createVector2(width, height)
}

export const heuristic = (vector1: Vector2Interface, vector2: Vector2Interface) =>
  Math.abs(vector1.x - vector2.x) + Math.abs(vector1.y - vector2.y)
