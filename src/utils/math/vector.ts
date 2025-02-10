import { lerp } from "@/src/utils/math/lerp"
import { distanceBetweenVector2 } from "@/src/utils/math/distanceBetweenVector3"

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

export function isVector2Equal(v1: Vector2Interface, v2: Vector2Interface): boolean {
  return v1.x === v2.x && v1.y === v2.y
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

export const vectorDimension = (
  min: Vector2Interface,
  max: Vector2Interface,
): Vector2Interface => {
  const width = Math.abs(max.x - min.x)
  const height = Math.abs(max.y - min.y)

  return createVector2(width, height)
}

export const extendVectorByStep = (
  points: Vector2Interface[],
  steps: number,
): Vector2Interface[] => {
  if (points.length < 2) return points

  const newPoints: Vector2Interface[] = []

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]

    newPoints.push(p1) // Garder le point original

    // Ajouter des points intermédiaires
    for (let j = 1; j < steps; j++) {
      const t = j / steps
      newPoints.push({
        x: lerp(p1.x, p2.x, t),
        y: lerp(p1.y, p2.y, t),
      })
    }
  }

  newPoints.push(points[points.length - 1]) // Ajouter le dernier point

  return newPoints
}

export const extendVectorByDistance = (
  points: Vector2Interface[],
  distance: number,
): Vector2Interface[] => {
  if (points.length < 2) return points

  const newPoints: Vector2Interface[] = []

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    const segmentDistance = distanceBetweenVector2(p1, p2)

    newPoints.push(p1) // Garder le point original

    let currentDistance = distance
    while (currentDistance < segmentDistance) {
      const t = currentDistance / segmentDistance
      newPoints.push({
        x: lerp(p1.x, p2.x, t),
        y: lerp(p1.y, p2.y, t),
      })
      currentDistance += distance
    }
  }

  newPoints.push(points[points.length - 1]) // Ajouter le dernier point

  return newPoints
}
