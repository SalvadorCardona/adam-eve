import {
  createMatrix,
  createMatrixBounds,
  generateMatrix,
  getMatrix,
  Matrix,
  subtractMatrix,
} from "@/src/utils/math/matrix"
import { createBoundingFromZone } from "@/src/utils/math/boudingBox"
import { createVector2 } from "@/src/utils/math/vector"
import { findPathAStar } from "@/src/utils/math/findPath"

describe("Test matrix", () => {
  it("Context createMatrix", () => {
    const matrix = createMatrix(3, 4)
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(matrix).toStrictEqual(expected)
  })

  it("Context createMatrixBounds", () => {
    const bound1 = createBoundingFromZone(createVector2(-1, -1), createVector2(2, 2))
    const bound2 = createBoundingFromZone(createVector2(-1, -1), createVector2(3, 3))
    const matrixBound = createMatrixBounds([bound1, bound2])
    const expected = createBoundingFromZone(
      createVector2(-1, -1),
      createVector2(3, 3),
    )
    expect(matrixBound).toStrictEqual(expected)
  })

  it("Context generate matrix", () => {
    const boundItem1 = createBoundingFromZone(
      createVector2(-1, -1),
      createVector2(1, 1),
    )
    boundItem1.id = "A"
    const boundItem2 = createBoundingFromZone(
      createVector2(2, 2),
      createVector2(6, 6),
    )
    boundItem2.id = "B"
    const matrixFilled = generateMatrix([boundItem1, boundItem2])

    const expected: Matrix = [
      ["A", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]

    expect(matrixFilled).toStrictEqual(expected)
  })

  it("Context getItem", () => {
    const matrix: Matrix = [
      ["A", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]

    expect(getMatrix(matrix, createVector2(0, 0))).equal("A")
    expect(getMatrix(matrix, createVector2(1000, 1000))).equal(0)
  })

  it("Context soustraction", () => {
    const source: Matrix = [
      [1, 1, "A", "B", 1, 1, 1],
      ["A", 1, 1, 1, 1, 1, 1],
    ]

    const target: Matrix = [
      [1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]

    const expected = [
      [0, 0, 0, 0, 1, 1, 1],
      ["A", 1, 1, 1, 1, 1, 1],
    ]

    const newMatrix = subtractMatrix(source, target)

    expect(newMatrix).toStrictEqual(expected)
  })

  it("Context test with path", () => {
    const boundItem1 = createBoundingFromZone(
      createVector2(1, 1),
      createVector2(2, 2),
    )
    boundItem1.id = "A"
    const boundItem2 = createBoundingFromZone(
      createVector2(12, 12),
      createVector2(16, 17),
    )
    boundItem2.id = "B"

    const boundItem3 = createBoundingFromZone(
      createVector2(0, 0),
      createVector2(17, 18),
    )
    boundItem3.id = "C"

    const matrixFilled = generateMatrix([boundItem3, boundItem1, boundItem2])
    const path = findPathAStar(matrixFilled, boundItem1.min, boundItem2.min)

    expect(path?.length).toStrictEqual(12)
  })
})
