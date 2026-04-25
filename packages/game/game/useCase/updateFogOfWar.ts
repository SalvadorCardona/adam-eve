import GameInterface from "@/packages/game/game/GameInterface"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

function ensureRows(matrix: boolean[][], height: number, width: number): boolean[][] {
  while (matrix.length < height) matrix.push(new Array(width).fill(false))
  for (let y = 0; y < height; y++) {
    const row = matrix[y]
    if (row.length < width) {
      for (let x = row.length; x < width; x++) row.push(false)
    }
  }
  return matrix
}

export function updateFogOfWar(game: GameInterface): void {
  const max = game.gameWorld.bounding.max
  const width = Math.max(0, Math.ceil(max.x))
  const height = Math.max(0, Math.ceil(max.y))
  if (width === 0 || height === 0) return

  const visited = ensureRows(game.gameWorld.visitedMatrix ?? [], height, width)
  const visible: boolean[][] = Array.from({ length: height }, () =>
    new Array(width).fill(false),
  )

  const revealers = entityQuery(game, { faction: EntityFaction.self })

  for (const entity of revealers) {
    const meta = getResource<EntityResourceInterface>(entity)
    const range = meta?.propriety?.vision?.range
    if (!range || range <= 0) continue
    const cx = entity.position.x
    const cz = entity.position.z
    const r2 = range * range
    const x0 = Math.max(0, Math.floor(cx - range))
    const x1 = Math.min(width - 1, Math.ceil(cx + range))
    const y0 = Math.max(0, Math.floor(cz - range))
    const y1 = Math.min(height - 1, Math.ceil(cz + range))
    for (let y = y0; y <= y1; y++) {
      const visibleRow = visible[y]
      const visitedRow = visited[y]
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx
        const dy = y + 0.5 - cz
        if (dx * dx + dy * dy <= r2) {
          visibleRow[x] = true
          visitedRow[x] = true
        }
      }
    }
  }

  game.gameWorld.visitedMatrix = visited
  game.gameWorld.visibleMatrix = visible
}
