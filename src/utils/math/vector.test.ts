// src/utils/math/Vector.test.ts

import {
  areVectorsEqual,
  createVector2,
  createVector3,
  heuristic,
  isVector2,
  isVector3,
  Vector2Interface,
  vector2ToVector3,
  Vector3Interface,
  vector3ToVector2,
  vectorSize,
  vectorTransformer,
} from "./vector"

describe("Vector Utility Functions", () => {
  test("createVector2 should create a Vector2Interface", () => {
    const vector = createVector2(1, 2)
    expect(vector).toEqual({ x: 1, y: 2 })
  })

  test("createVector3 should create a Vector3Interface", () => {
    const vector = createVector3(1, 2, 3)
    expect(vector).toEqual({ x: 1, y: 2, z: 3 })
  })

  test("vector3ToVector2 should convert Vector3Interface to Vector2Interface", () => {
    const vector3: Vector3Interface = { x: 1, y: 2, z: 3 }
    const vector2 = vector3ToVector2(vector3)
    expect(vector2).toEqual({ x: 1, y: 3 })
  })

  test("vector2ToVector3 should convert Vector2Interface to Vector3Interface", () => {
    const vector2: Vector2Interface = { x: 1, y: 2 }
    const vector3 = vector2ToVector3(vector2)
    expect(vector3).toEqual({ x: 1, y: 0, z: 2 })
  })

  test("areVectorsEqual should check if two Vector3Interface are equal", () => {
    const v1: Vector3Interface = { x: 1, y: 2, z: 3 }
    const v2: Vector3Interface = { x: 1, y: 2, z: 3 }
    expect(areVectorsEqual(v1, v2)).toBe(true)
  })

  test("isVector3 should check if a vector is Vector3Interface", () => {
    const vector3: Vector3Interface = { x: 1, y: 2, z: 3 }
    expect(isVector3(vector3)).toBe(true)
  })

  test("isVector2 should check if a vector is Vector2Interface", () => {
    const vector2: Vector2Interface = { x: 1, y: 2 }
    expect(isVector2(vector2)).toBe(true)
  })

  test("vectorTransformer should apply a callback to each component of the vector", () => {
    const vector2: Vector2Interface = { x: 1, y: 2 }
    const transformedVector = vectorTransformer(vector2, (n) => n * 2)
    expect(transformedVector).toEqual({ x: 2, y: 4 })
  })

  test("vectorSize should calculate the size between two vectors", () => {
    const min: Vector2Interface = { x: 1, y: 1 }
    const max: Vector2Interface = { x: 4, y: 5 }
    const size = vectorSize(min, max)
    expect(size).toEqual({ x: 3, y: 4 })
  })

  test("heuristic should calculate the Manhattan distance between two vectors", () => {
    const vector1: Vector2Interface = { x: 1, y: 2 }
    const vector2: Vector2Interface = { x: 4, y: 6 }
    const distance = heuristic(vector1, vector2)
    expect(distance).toBe(7)
  })
})
