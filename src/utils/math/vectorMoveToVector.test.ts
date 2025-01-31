import { createVector3 } from "@/src/utils/math/vector"

import { aroundDecimal } from "@/src/utils/math/roundVectorToDown"
import {
  vectorMoveToVector,
  VectorMoveToVectorReturnInterface,
} from "./vectorMoveToVector"

describe("Test Vector Move To Vector", () => {
  it("Little Move", () => {
    const source = createVector3(0, 0, 0)
    const target = createVector3(1, 0, 0)

    const result = vectorMoveToVector(source, target, 0.5)
    const expected: VectorMoveToVectorReturnInterface = {
      position: createVector3(0.5, 0, 0),
      distance: 0.5,
      rotation: aroundDecimal(Math.PI / 2),
      isFinish: false,
    }

    expect(result).toStrictEqual(expected)
  })

  it("Test if Equal", () => {
    const source = createVector3(1, 1, 1)
    const target = createVector3(1, 1, 1)
    const result = vectorMoveToVector(source, target, 0.5)
    const expected: VectorMoveToVectorReturnInterface = {
      position: createVector3(1, 1, 1),
      distance: 0,
      rotation: 0,
      isFinish: true,
    }

    expect(result).toStrictEqual(expected)
  })

  it("Test if Sup", () => {
    const source = createVector3(2, 2, 2)
    const target = createVector3(1, 1, 1)

    const result = vectorMoveToVector(source, target, 0.5)
    const expected = createVector3(
      1.6464466094067263,
      1.6464466094067263,
      1.6464466094067263,
    )

    expect(result.position).toStrictEqual(expected)
  })
})
