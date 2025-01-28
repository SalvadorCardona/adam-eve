import {
  BoundingBoxAABBInterface,
  createBoundingAABB,
} from "@/src/utils/math/boudingBox"

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

  return createBoundingAABB(minX, maxX, minZ, maxZ)
}

const fillMatrix = (
  bounds: BoundingBoxAABBInterface[],
  bound: BoundingBoxAABBInterface,
  matrix: (string | null)[][],
) => {
  for (const currentBound of bounds) {
    const startX = currentBound.min.x - bound.min.x
    const startY = currentBound.min.y - bound.min.y

    for (let y = 0; y < currentBound.size.height; y++) {
      for (let x = 0; x < currentBound.size.width; x++) {
        const matrixX = startX + x
        const matrixZ = startY + y

        if (matrixZ < matrix.length && matrixX < matrix[0].length) {
          matrix[matrixZ][matrixX] = currentBound.type // Marquer les cellules avec le type de l'entité
        }
      }
    }
  }
  return matrix
}
