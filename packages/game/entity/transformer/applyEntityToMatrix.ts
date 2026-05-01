import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { getInMatrix, setMatrix } from "@/packages/math/matrix"
import { Vector2Interface } from "@/packages/math/vector"
import { ContainerAction } from "@/packages/jsonLd/jsonLd"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import {
  ensureOriginCovers,
  worldToMatrix,
} from "@/packages/game/game/useCase/command/worldMatrix"

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

export function applyGroundToMatrices(
  game: GameInterface,
  ground: EntityInterface,
  action: ContainerAction,
): void {
  const cells = getEntityFootprintCells(ground)
  ensureOriginCovers(game, cells)

  const removing = action === ContainerAction.remove
  const tileType = ground["@type"] ?? 0

  for (const cell of cells) {
    const matrixCell = worldToMatrix(game, cell)
    if (removing) {
      setMatrix(game.gameWorld.groundMatrix, matrixCell, 0)
      setMatrix(game.gameWorld.entitiesMatrix, matrixCell, 0)
      continue
    }

    setMatrix(game.gameWorld.groundMatrix, matrixCell, tileType)
    const blocking = getInMatrix(game.gameWorld.buildingMatrix, matrixCell)
    setMatrix(game.gameWorld.entitiesMatrix, matrixCell, blocking ? 0 : tileType)
  }
}

export function applyBuildingToMatrices(
  game: GameInterface,
  building: EntityInterface,
  action: ContainerAction,
): void {
  const cells = getEntityFootprintCells(building)
  ensureOriginCovers(game, cells)

  const removing = action === ContainerAction.remove
  const buildingId = building["@id"]

  for (const cell of cells) {
    const matrixCell = worldToMatrix(game, cell)
    if (removing) {
      const occupant = getInMatrix(game.gameWorld.buildingMatrix, matrixCell)
      if (occupant !== buildingId) continue
      setMatrix(game.gameWorld.buildingMatrix, matrixCell, 0)
      const groundUnder = getInMatrix(game.gameWorld.groundMatrix, matrixCell)
      setMatrix(game.gameWorld.entitiesMatrix, matrixCell, groundUnder || 0)
      continue
    }

    setMatrix(game.gameWorld.buildingMatrix, matrixCell, buildingId)
    setMatrix(game.gameWorld.entitiesMatrix, matrixCell, 0)
  }
}
