import {
  BoundingBoxAABBInterface,
  createBounding,
} from "@/src/utils/math/boudingBox"
import { vectorSize } from "@/src/utils/math/Vector"

export const createMatrix = (width: number, height: number) =>
  Array.from({ length: height }, () => Array(width).fill(undefined))

const getMatrixBounds = (
  bounds: BoundingBoxAABBInterface[],
): BoundingBoxAABBInterface => {
  let minX = Infinity,
    maxX = -Infinity
  let minZ = Infinity,
    maxZ = -Infinity

  for (const bound of bounds) {
    minX = Math.min(minX, bound.min.x)
    maxX = Math.max(maxX, bound.max.x)
    minZ = Math.min(minZ, bound.min.y)
    maxZ = Math.max(maxZ, bound.max.y)
  }

  return createBounding(minX, maxX, minZ, maxZ)
}

const fillMatrix = (
  bounds: BoundingBoxAABBInterface[],
  bound: BoundingBoxAABBInterface,
  matrix: boolean[][],
) => {
  for (const currentBound of bounds) {
    const startX = currentBound.min.x - bound.min.x
    const startY = currentBound.min.y - bound.min.y
    const size = vectorSize(currentBound.min, currentBound.max)
    for (let y = 0; y < size.y; y++) {
      for (let x = 0; x < size.x; x++) {
        const matrixX = startX + x
        const matrixZ = startY + y

        matrix[matrixZ][matrixX] =
          matrixZ < matrix.length && matrixX < matrix[0].length
      }
    }
  }
  return matrix
}
