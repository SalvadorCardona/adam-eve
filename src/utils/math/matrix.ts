import { BoundingInterface, createBoundingByABB } from "@/src/utils/math/boudingBox"

export type MatrixItem = string | number
export type Matrix = (string | 0 | 1)[][]

export const createMatrix = (width: number, height: number): Matrix =>
  Array.from({ length: height }, () => Array(width).fill(0))

export const getMatrix = (
  matrixSource: Matrix,
  x: number,
  y: number,
): MatrixItem => {
  return matrixSource[y]?.[x] ?? 0
}

export function subtractMatrix(matrixSource: Matrix, matrixTarget: Matrix): Matrix {
  return matrixSource.map((row, y) =>
    row.map((cell, x) => {
      const targetValue = getMatrix(matrixTarget, x, y)
      return targetValue ? 0 : cell
    }),
  )
}

export const createMatrixBounds = (
  bounds: BoundingInterface[],
): BoundingInterface => {
  let minX = Infinity,
    maxX = -Infinity
  let minY = Infinity,
    maxY = -Infinity

  for (const bound of bounds) {
    minX = Math.min(minX, bound.min.x)
    maxX = Math.max(maxX, bound.max.x)
    minY = Math.min(minY, bound.min.y)
    maxY = Math.max(maxY, bound.max.y)
  }

  return createBoundingByABB({
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY },
  })
}

const fillMatrix = (boundItems: BoundingInterface[], matrix: Matrix) => {
  for (const boundItem of boundItems) {
    const startX = boundItem.min.x
    const startY = boundItem.min.y

    for (let y = 0; y < boundItem.size.y; y++) {
      for (let x = 0; x < boundItem.size.x; x++) {
        const matrixX = startX + x
        const matrixY = startY + y

        if (
          matrixY >= 0 &&
          matrixY < matrix.length &&
          matrixX >= 0 &&
          matrixX < (matrix[0]?.length ?? 0)
        ) {
          matrix[matrixY][matrixX] = boundItem?.id ?? 1
        }
      }
    }
  }

  return matrix
}

export const generateMatrix = (boundItems: BoundingInterface[]) => {
  const matrixBound = createMatrixBounds(boundItems)
  const matrix = createMatrix(matrixBound.size.x, matrixBound.size.y)
  return fillMatrix(boundItems, matrix)
}
