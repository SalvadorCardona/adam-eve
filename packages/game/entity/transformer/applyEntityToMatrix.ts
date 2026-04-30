import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import {
  Matrix2DInterface,
  getInMatrix,
  setMatrix,
} from "@/packages/math/matrix"
import { Vector2Interface } from "@/packages/math/vector"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"

export function ensureMatrixSize(
  matrix: Matrix2DInterface,
  width: number,
  height: number,
): void {
  while (matrix.length < height) matrix.push([])
  for (let y = 0; y < matrix.length; y++) {
    while (matrix[y].length < width) matrix[y].push(0)
  }
}

export function getEntityFootprintCells(
  entity: EntityInterface,
): Vector2Interface[] {
  const bbox = entityToBoundingBox(entity)
  const startX = Math.floor(bbox.min.x)
  const startY = Math.floor(bbox.min.y)
  const endX = Math.ceil(bbox.max.x) - 1
  const endY = Math.ceil(bbox.max.y) - 1

  const cells: Vector2Interface[] = []
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      cells.push({ x, y })
    }
  }
  return cells
}

function ensureGameWorldMatrices(game: GameInterface, cells: Vector2Interface[]): void {
  let maxX = 0
  let maxY = 0
  for (const cell of cells) {
    if (cell.x + 1 > maxX) maxX = cell.x + 1
    if (cell.y + 1 > maxY) maxY = cell.y + 1
  }

  const width = Math.max(
    maxX,
    Math.ceil(game.gameWorld.bounding.max.x),
  )
  const height = Math.max(
    maxY,
    Math.ceil(game.gameWorld.bounding.max.y),
  )

  ensureMatrixSize(game.gameWorld.groundMatrix, width, height)
  ensureMatrixSize(game.gameWorld.buildingMatrix, width, height)
  ensureMatrixSize(game.gameWorld.entitiesMatrix, width, height)
}

export function applyGroundToMatrices(
  game: GameInterface,
  ground: EntityInterface,
  action: ContainerAction,
): void {
  const cells = getEntityFootprintCells(ground)
  ensureGameWorldMatrices(game, cells)

  const removing = action === ContainerAction.remove
  const tileType = ground["@type"] ?? 0

  for (const cell of cells) {
    if (removing) {
      setMatrix(game.gameWorld.groundMatrix, cell, 0)
      setMatrix(game.gameWorld.entitiesMatrix, cell, 0)
      continue
    }

    setMatrix(game.gameWorld.groundMatrix, cell, tileType)
    const blocking = getInMatrix(game.gameWorld.buildingMatrix, cell)
    setMatrix(game.gameWorld.entitiesMatrix, cell, blocking ? 0 : tileType)
  }
}

export function applyBuildingToMatrices(
  game: GameInterface,
  building: EntityInterface,
  action: ContainerAction,
): void {
  const cells = getEntityFootprintCells(building)
  ensureGameWorldMatrices(game, cells)

  const removing = action === ContainerAction.remove
  const buildingId = building["@id"]

  for (const cell of cells) {
    if (removing) {
      const occupant = getInMatrix(game.gameWorld.buildingMatrix, cell)
      if (occupant !== buildingId) continue
      setMatrix(game.gameWorld.buildingMatrix, cell, 0)
      const groundUnder = getInMatrix(game.gameWorld.groundMatrix, cell)
      setMatrix(game.gameWorld.entitiesMatrix, cell, groundUnder || 0)
      continue
    }

    setMatrix(game.gameWorld.buildingMatrix, cell, buildingId)
    setMatrix(game.gameWorld.entitiesMatrix, cell, 0)
  }
}
