import {
  BoundingInterface,
  boundingIsOver,
  createBoundingByABB,
  createBoundingByOBB,
  mergeBounding,
} from "@/src/utils/math/boudingBox"
import { createVector2 } from "@/src/utils/math/vector"

describe("Test boundingBox", () => {
  it("Context createBoundingByABB", () => {
    const bounding = createBoundingByABB({
      min: createVector2(-5, -7),
      max: createVector2(-1, -1),
      id: "a",
    })
    const expected: BoundingInterface = {
      min: createVector2(-5, -7),
      max: createVector2(-1, -1),
      size: createVector2(4, 6),
      position: createVector2(-3, -4),
      id: "a",
    }

    expect(bounding).toStrictEqual(expected)
  })

  it("Context createBoundingByOBB", () => {
    const bounding = createBoundingByOBB({
      size: createVector2(4, 6),
      position: createVector2(-3, -4),
      id: "a",
    })

    const expected: BoundingInterface = {
      min: createVector2(-5, -7),
      max: createVector2(-1, -1),
      size: createVector2(4, 6),
      position: createVector2(-3, -4),
      id: "a",
    }

    expect(bounding).toStrictEqual(expected)
  })

  it("Context test if bounding is more biggest", () => {
    const boundingSource: BoundingInterface = createBoundingByABB({
      min: { x: 0, y: 0 },
      max: { x: 10, y: 10 },
    })

    const boundingTarget: BoundingInterface = createBoundingByABB({
      min: { x: -1, y: 0 },
      max: { x: 5, y: 5 },
    })

    expect(boundingIsOver(boundingSource, boundingTarget)).toBe(true)
  })

  it("Context test if bounding is less biggest", () => {
    const boundingSource: BoundingInterface = createBoundingByABB({
      min: { x: 0, y: 0 },
      max: { x: 10, y: 10 },
    })

    const boundingTarget: BoundingInterface = createBoundingByABB({
      min: { x: 1, y: 1 },
      max: { x: 3, y: 3 },
    })

    expect(boundingIsOver(boundingSource, boundingTarget)).toBe(false)
  })

  it("Context merge Bouding", () => {
    const boundingSource: BoundingInterface = createBoundingByABB({
      min: { x: 0, y: 0 },
      max: { x: 1, y: 1 },
    })

    const boundingTarget: BoundingInterface = createBoundingByABB({
      min: { x: 10, y: 10 },
      max: { x: 11, y: 11 },
    })

    const result = mergeBounding(boundingSource, boundingTarget)

    expect(boundingSource.min).toStrictEqual(result.min)
    expect(boundingTarget.max).toStrictEqual(result.max)
  })
})
