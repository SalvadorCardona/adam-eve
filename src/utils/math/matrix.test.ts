import {
  createMatrix2D,
  createMatrixByBounding,
  getInMatrix,
  Matrix2DInterface,
  matrixToVector,
  subtractMatrix,
} from "@/src/utils/math/matrix"
import { createBoundingFromZone } from "@/src/utils/math/boudingBox"
import { createVector2, Vector2Interface } from "@/src/utils/math/vector"
import { findPathAStar } from "@/src/utils/math/findPath"

describe("Test matrix", () => {
  it("Context createMatrix", () => {
    const matrix = createMatrix2D(3, 4)
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(matrix).toStrictEqual(expected)
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
    const matrixFilled = createMatrixByBounding([boundItem1, boundItem2])

    const expected: Matrix2DInterface = [
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
    const matrix: Matrix2DInterface = [
      ["A", 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, "B", "B", "B", "B", 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]

    expect(getInMatrix(matrix, createVector2(0, 0))).equal("A")
    expect(getInMatrix(matrix, createVector2(1000, 1000))).equal(0)
  })

  it("Context soustraction", () => {
    const source: Matrix2DInterface = [
      [1, 1, "A", "B", 1, 1, 1],
      ["A", 1, 1, 1, 1, 1, 1],
    ]

    const target: Matrix2DInterface = [
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

    const matrixFilled = createMatrixByBounding([boundItem3, boundItem1, boundItem2])
    const path = findPathAStar(matrixFilled, boundItem1.min, boundItem2.min)

    expect(path?.length).toStrictEqual(12)
  })

  it("Context matrixToVector", () => {
    const source: Matrix2DInterface = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ]

    const expected: Vector2Interface[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
      { x: 3, y: 1 },
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ]

    const newMatrix = matrixToVector(source)

    expect(newMatrix).toStrictEqual(expected)
  })
})
