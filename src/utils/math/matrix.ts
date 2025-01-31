import { BoundingInterface, createBoundingByABB } from "@/src/utils/math/boudingBox"
import { createVector2, Vector2Interface } from "@/src/utils/math/vector"

export type MatrixItem = string | 0 | 1
export type Matrix = MatrixItem[][]

// export const matrixDirection: Record<string, Vector2Interface> = {
//   top: { x: 0, y: -1 },
//   bottom: { x: 0, y: 1 },
//   left: { x: -1, y: 0 },
//   right: { x: 1, y: 0 },
// }

export const matrixDirection: Record<string, Vector2Interface> = {
  top: { x: 0, y: -1 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  topLeft: { x: -1, y: -1 },
  topRight: { x: 1, y: -1 },
  bottomLeft: { x: -1, y: 1 },
  bottomRight: { x: 1, y: 1 },
}

export const createMatrix = (width: number, height: number): Matrix =>
  Array.from({ length: height }, () => Array(width).fill(0))

export const getMatrix = (
  matrixSource: Matrix,
  position: Vector2Interface,
): MatrixItem => {
  return matrixSource[position.y]?.[position.x] ?? 0
}

export const setMatrix = (
  matrixSource: Matrix,
  position: Vector2Interface,
  value: MatrixItem,
): void => {
  matrixSource[position.y][position.x] = value
}

export function subtractMatrix(matrixSource: Matrix, matrixTarget: Matrix): Matrix {
  return matrixSource.map((row, y) =>
    row.map((cell, x) => {
      const targetValue = getMatrix(matrixTarget, createVector2(x, y))
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
