import {
  BoundingInterface,
  createBoundingByABB,
  mergeBounding,
} from "@/src/utils/math/boudingBox"
import { createVector2, Vector2Interface } from "@/src/utils/math/vector"

export type MatrixItemInterface = string | 0 | 1
export type MatrixInterface = MatrixItemInterface[][]

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

export const createMatrix = (width: number, height: number): MatrixInterface =>
  Array.from({ length: height }, () => Array(width).fill(0))

export const getMatrix = (
  matrixSource: MatrixInterface,
  position: Vector2Interface,
): MatrixItemInterface => {
  return matrixSource[position.y]?.[position.x] ?? 0
}

export const setMatrix = (
  matrixSource: MatrixInterface,
  position: Vector2Interface,
  value: MatrixItemInterface,
): void => {
  matrixSource[position.y][position.x] = value
}

export function subtractMatrix(
  matrixSource: MatrixInterface,
  matrixTarget: MatrixInterface,
): MatrixInterface {
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
  let matrixBounding = createBoundingByABB({
    min: createVector2(Infinity, Infinity),
    max: createVector2(-Infinity, -Infinity),
  })

  for (const bound of bounds) {
    matrixBounding = mergeBounding(matrixBounding, bound)
  }

  return matrixBounding
}

const fillMatrix = (boundItems: BoundingInterface[], matrix: MatrixInterface) => {
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
