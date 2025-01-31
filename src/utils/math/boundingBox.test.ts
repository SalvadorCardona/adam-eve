import {
  BoundingInterface,
  createBoundingByABB,
  createBoundingByOBB,
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
})
