import {
  ratioDown,
  ratioUP,
  vectorRatioDown,
  vectorRatioUP,
} from "@/src/utils/math/ratio"
import { createVector3 } from "@/src/utils/math/vector"

describe("Test ratio", () => {
  it("Context Up", () => {
    expect(ratioUP(3, 50)).toEqual(150)
  })

  it("Context Down", () => {
    expect(ratioDown(150, 50)).toEqual(3)
  })

  it("Context Ratio Up", () => {
    expect(vectorRatioUP(createVector3(1, 1, 1), 50)).toStrictEqual(
      createVector3(50, 50, 50),
    )
  })

  it("Context Ratio Down", () => {
    expect(vectorRatioDown(createVector3(150, 150, 150), 50)).toStrictEqual(
      createVector3(3, 3, 3),
    )
  })
})
