import GameInterface from "@/packages/game/game/GameInterface"
import { Vector2Interface, createVector2 } from "@/packages/math/vector"

const SHIFT_BUCKET = 32

function getOrigin(game: GameInterface): Vector2Interface {
  if (!game.gameWorld.origin) {
    game.gameWorld.origin = createVector2()
  }
  return game.gameWorld.origin
}

export function worldToMatrix(
  game: GameInterface,
  worldCell: Vector2Interface,
): Vector2Interface {
  const origin = getOrigin(game)
  return { x: worldCell.x + origin.x, y: worldCell.y + origin.y }
}

export function matrixToWorld(
  game: GameInterface,
  matrixCell: Vector2Interface,
): Vector2Interface {
  const origin = getOrigin(game)
  return { x: matrixCell.x - origin.x, y: matrixCell.y - origin.y }
}

function shiftColumns<T>(matrix: T[][], dx: number, fill: T): void {
  if (dx <= 0) return
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y]
    if (!row || row.length === 0) continue
    const padding: T[] = new Array(dx).fill(fill)
    matrix[y] = padding.concat(row)
  }
}

function shiftRows<T>(matrix: T[][], dy: number): void {
  if (dy <= 0) return
  const newRows = Array.from({ length: dy }, () => [] as T[])
  matrix.unshift(...newRows)
}

export function ensureOriginCovers(
  game: GameInterface,
  worldCells: Vector2Interface[],
): void {
  if (worldCells.length === 0) return
  const origin = getOrigin(game)

  let minMatrixX = Infinity
  let minMatrixY = Infinity
  for (const cell of worldCells) {
    const mx = cell.x + origin.x
    const my = cell.y + origin.y
    if (mx < minMatrixX) minMatrixX = mx
    if (my < minMatrixY) minMatrixY = my
  }

  if (minMatrixX < 0) {
    const shift = Math.ceil(-minMatrixX / SHIFT_BUCKET) * SHIFT_BUCKET
    shiftColumns(game.gameWorld.groundMatrix, shift, 0)
    shiftColumns(game.gameWorld.buildingMatrix, shift, 0)
    shiftColumns(game.gameWorld.entitiesMatrix, shift, 0)
    if (game.gameWorld.visitedMatrix) {
      shiftColumns(game.gameWorld.visitedMatrix, shift, false)
    }
    origin.x += shift
  }

  if (minMatrixY < 0) {
    const shift = Math.ceil(-minMatrixY / SHIFT_BUCKET) * SHIFT_BUCKET
    shiftRows(game.gameWorld.groundMatrix, shift)
    shiftRows(game.gameWorld.buildingMatrix, shift)
    shiftRows(game.gameWorld.entitiesMatrix, shift)
    if (game.gameWorld.visitedMatrix) {
      shiftRows(game.gameWorld.visitedMatrix, shift)
    }
    origin.y += shift
  }
}
