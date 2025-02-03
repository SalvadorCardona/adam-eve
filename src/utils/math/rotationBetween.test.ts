import { createVector2 } from "@/src/utils/math/vector"
import { rotationBetweenVector2 } from "@/src/utils/math/rotationBetween"

describe("Test rotationBetween", () => {
  it("Context 1", () => {
    expect(rotationBetweenVector2(createVector2(1, 1))).toEqual(Math.PI / 4)
    expect(rotationBetweenVector2(createVector2(0, 1))).toEqual(Math.PI / 2)
    expect(rotationBetweenVector2(createVector2(-1, 1))).toEqual((3 * Math.PI) / 4)
    expect(rotationBetweenVector2(createVector2(-1, 0))).toEqual(Math.PI)
    expect(rotationBetweenVector2(createVector2(-1, -1))).toEqual(-(3 * Math.PI) / 4)
    expect(rotationBetweenVector2(createVector2(0, -1))).toEqual(-Math.PI / 2)
    expect(rotationBetweenVector2(createVector2(1, -1))).toEqual(-Math.PI / 4)
  })
})
