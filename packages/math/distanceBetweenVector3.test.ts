import { describe, expect, test } from "vitest"
import {
  distanceBetweenVector2,
  distanceBetweenVector3,
  distanceSquaredBetweenVector2,
  distanceSquaredBetweenVector3,
} from "./distanceBetweenVector3"

describe("distance helpers", () => {
  test("distanceBetweenVector2 returns the euclidean distance", () => {
    expect(distanceBetweenVector2({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
  })

  test("distanceBetweenVector2 returns 0 for identical points", () => {
    expect(distanceBetweenVector2({ x: 7, y: -2 }, { x: 7, y: -2 })).toBe(0)
  })

  test("distanceBetweenVector3 returns the euclidean distance in 3D", () => {
    expect(distanceBetweenVector3({ x: 0, y: 0, z: 0 }, { x: 2, y: 3, z: 6 })).toBe(7)
  })

  test("distanceSquaredBetweenVector2 returns the squared euclidean distance", () => {
    expect(distanceSquaredBetweenVector2({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(25)
  })

  test("distanceSquaredBetweenVector2 handles negative coordinates", () => {
    expect(distanceSquaredBetweenVector2({ x: -1, y: -1 }, { x: 2, y: 3 })).toBe(25)
  })

  test("distanceSquaredBetweenVector3 returns the squared euclidean distance in 3D", () => {
    expect(
      distanceSquaredBetweenVector3({ x: 0, y: 0, z: 0 }, { x: 2, y: 3, z: 6 }),
    ).toBe(49)
  })

  test("distanceSquared preserves ordering of distance (sqrt is monotonic)", () => {
    const origin = { x: 0, y: 0 }
    const near = { x: 1, y: 1 }
    const far = { x: 5, y: 5 }
    const sqNear = distanceSquaredBetweenVector2(origin, near)
    const sqFar = distanceSquaredBetweenVector2(origin, far)
    const dNear = distanceBetweenVector2(origin, near)
    const dFar = distanceBetweenVector2(origin, far)
    expect(sqNear < sqFar).toBe(dNear < dFar)
  })

  test("squared distance is consistent with the squared euclidean distance", () => {
    const a = { x: 1, y: 2 }
    const b = { x: 4, y: 6 }
    const d = distanceBetweenVector2(a, b)
    expect(distanceSquaredBetweenVector2(a, b)).toBeCloseTo(d * d, 10)
  })
})
