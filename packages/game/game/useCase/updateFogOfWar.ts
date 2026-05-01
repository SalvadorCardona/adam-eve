import GameInterface from "@/packages/game/game/GameInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { Vector2Interface } from "@/packages/math/vector"
import {
  ensureOriginCovers,
  worldToMatrix,
} from "@/packages/game/game/useCase/command/worldMatrix"

export function updateFogOfWar(game: GameInterface): Array<[number, number]> {
  const revealers = entityQuery(game, { faction: EntityFaction.self })
  if (revealers.length === 0) return []

  const cellsToReveal: Vector2Interface[] = []

  for (const entity of revealers) {
    const meta = getResource<EntityResourceInterface>(entity)
    const range = meta?.propriety?.vision?.range ?? 1
    if (!range || range <= 0) continue
    const cx = entity.position.x
    const cz = entity.position.z
    const r2 = range * range
    const x0 = Math.floor(cx - range)
    const x1 = Math.ceil(cx + range)
    const y0 = Math.floor(cz - range)
    const y1 = Math.ceil(cz + range)
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx
        const dy = y + 0.5 - cz
        if (dx * dx + dy * dy <= r2) {
          cellsToReveal.push({ x, y })
        }
      }
    }
  }

  if (cellsToReveal.length === 0) return []

  ensureOriginCovers(game, cellsToReveal)

  const visited = game.gameWorld.visitedMatrix ?? []
  game.gameWorld.visitedMatrix = visited

  const newlyRevealed: Array<[number, number]> = []
  for (const worldCell of cellsToReveal) {
    const matrixCell = worldToMatrix(game, worldCell)
    let row = visited[matrixCell.y]
    if (!row) {
      row = []
      visited[matrixCell.y] = row
    }
    if (row[matrixCell.x]) continue
    row[matrixCell.x] = true
    newlyRevealed.push([worldCell.x, worldCell.y])
  }

  return newlyRevealed
}
