import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { JsonLdType } from "@/packages/jsonLd/jsonLd"
import { Vector2Interface } from "@/packages/math/vector"
import { getInMatrix } from "@/packages/math/matrix"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import { worldToMatrix } from "@/packages/game/game/useCase/command/worldMatrix"

export function getTileAtCell(
  game: GameInterface,
  cell: Vector2Interface,
): JsonLdType | undefined {
  const matrix = game.gameWorld?.groundMatrix
  if (!matrix) return undefined
  const matrixCell = worldToMatrix(game, cell)
  const value = getInMatrix(matrix, matrixCell)
  return typeof value === "string" ? value : undefined
}

export function hasTileAtCell(
  game: GameInterface,
  cell: Vector2Interface,
): boolean {
  return getTileAtCell(game, cell) !== undefined
}

export function findTileUnderEntity(
  game: GameInterface,
  entity: EntityInterface,
): JsonLdType | undefined {
  const bbox = entityToBoundingBox(entity)
  const startX = Math.floor(bbox.min.x)
  const startY = Math.floor(bbox.min.y)
  const endX = Math.ceil(bbox.max.x) - 1
  const endY = Math.ceil(bbox.max.y) - 1

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      const tile = getTileAtCell(game, { x, y })
      if (tile) return tile
    }
  }

  return undefined
}
