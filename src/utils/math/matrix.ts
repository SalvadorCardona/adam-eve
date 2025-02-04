import {
  BoundingInterface,
  mergeBoundingCollection,
} from "@/src/utils/math/boudingBox"
import { createVector2, Vector2Interface } from "@/src/utils/math/vector"

export type MatrixItemInterface = string | 0 | 1
export type Matrix2DInterface = MatrixItemInterface[][]
export type Matrix3DInterface = MatrixItemInterface[][][]

export enum Direction {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}

export const matrixDirection: Record<Direction, Vector2Interface> = {
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  topLeft: { x: -1, y: -1 },
  topRight: { x: 1, y: -1 },
  bottomLeft: { x: -1, y: 1 },
  bottomRight: { x: 1, y: 1 },
}

export const createMatrix2D = (width: number, height: number): Matrix2DInterface =>
  Array.from({ length: height }, () => Array(width).fill(0))

export const createMatrix3D = (
  width: number,
  height: number,
  depth: number,
): Matrix3DInterface => {
  return Array.from({ length: depth }, () => createMatrix2D(width, height))
}

export const matrixToVector = (matrix: Matrix2DInterface): Vector2Interface[] => {
  const result: Vector2Interface[] = []
  matrix.forEach((row, y) =>
    row.forEach((cell, x) => {
      const targetValue = getInMatrix(matrix, createVector2(x, y))
      if (targetValue) {
        result.push(createVector2(x, y))
      }
    }),
  )

  return result
}

export const createMatrixByBounding = (boundItems: BoundingInterface[]) => {
  const matrixBound = mergeBoundingCollection(boundItems)
  const matrix = createMatrix2D(matrixBound.size.x, matrixBound.size.y)
  return fillMatrix(boundItems, matrix)
}

export const getInMatrix = (
  matrixSource: Matrix2DInterface,
  position: Vector2Interface,
): MatrixItemInterface => {
  return matrixSource[position.y]?.[position.x] ?? 0
}

export const setMatrix = (
  matrixSource: Matrix2DInterface,
  position: Vector2Interface,
  value: MatrixItemInterface,
): void => {
  matrixSource[position.y][position.x] = value
}

export function subtractMatrix(
  matrixSource: Matrix2DInterface,
  matrixTarget: Matrix2DInterface,
): Matrix2DInterface {
  return matrixSource.map((row, y) =>
    row.map((cell, x) => {
      const targetValue = getInMatrix(matrixTarget, createVector2(x, y))
      return targetValue ? 0 : cell
    }),
  )
}

const fillMatrix = (boundItems: BoundingInterface[], matrix: Matrix2DInterface) => {
  for (const boundItem of boundItems) {
    const startX = boundItem.min.x
    const startY = boundItem.min.y

    for (let y = 0; y < boundItem.size.y; y++) {
      for (let x = 0; x < boundItem.size.x; x++) {
        const matrixPositon = createVector2(startX + x, startY + y)
        if (
          matrixPositon.y >= 0 &&
          matrixPositon.y < matrix.length &&
          matrixPositon.x >= 0 &&
          matrixPositon.x < (matrix[0]?.length ?? 0)
        ) {
          setMatrix(matrix, matrixPositon, boundItem?.id ?? 1)
        }
      }
    }
  }

  return matrix
}
