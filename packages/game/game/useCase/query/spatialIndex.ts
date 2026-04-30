import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { Vector2Interface } from "@/packages/math/vector"

const CHUNK = 8

interface SpatialCache {
  time: number
  gameIri: string
  byChunk: Map<string, EntityInterface[]>
}

const cache: SpatialCache = {
  time: -1,
  gameIri: "",
  byChunk: new Map(),
}

function chunkKey(x: number, y: number): string {
  return Math.floor(x / CHUNK) + "," + Math.floor(y / CHUNK)
}

function rebuild(game: GameInterface): void {
  const byChunk = new Map<string, EntityInterface[]>()
  for (const entity of Object.values(game.entities)) {
    const key = chunkKey(entity.position.x, entity.position.z)
    const bucket = byChunk.get(key)
    if (bucket) bucket.push(entity)
    else byChunk.set(key, [entity])
  }
  cache.time = game.time
  cache.gameIri = game["@id"]
  cache.byChunk = byChunk
}

function getIndex(game: GameInterface): Map<string, EntityInterface[]> {
  if (cache.time !== game.time || cache.gameIri !== game["@id"]) {
    rebuild(game)
  }
  return cache.byChunk
}

function collectFromRange(
  index: Map<string, EntityInterface[]>,
  minCX: number,
  maxCX: number,
  minCY: number,
  maxCY: number,
): EntityInterface[] {
  const out: EntityInterface[] = []
  for (let cy = minCY; cy <= maxCY; cy++) {
    for (let cx = minCX; cx <= maxCX; cx++) {
      const bucket = index.get(cx + "," + cy)
      if (bucket) {
        for (const entity of bucket) out.push(entity)
      }
    }
  }
  return out
}

export function circleCandidates(
  game: GameInterface,
  center: Vector2Interface,
  radius: number,
): EntityInterface[] {
  const index = getIndex(game)
  const minCX = Math.floor((center.x - radius) / CHUNK) - 1
  const maxCX = Math.floor((center.x + radius) / CHUNK) + 1
  const minCY = Math.floor((center.y - radius) / CHUNK) - 1
  const maxCY = Math.floor((center.y + radius) / CHUNK) + 1
  return collectFromRange(index, minCX, maxCX, minCY, maxCY)
}

export function squareCandidates(
  game: GameInterface,
  start: Vector2Interface,
  end: Vector2Interface,
): EntityInterface[] {
  const index = getIndex(game)
  const x1 = Math.min(start.x, end.x)
  const x2 = Math.max(start.x, end.x)
  const y1 = Math.min(start.y, end.y)
  const y2 = Math.max(start.y, end.y)
  const minCX = Math.floor(x1 / CHUNK) - 1
  const maxCX = Math.floor(x2 / CHUNK) + 1
  const minCY = Math.floor(y1 / CHUNK) - 1
  const maxCY = Math.floor(y2 / CHUNK) + 1
  return collectFromRange(index, minCX, maxCX, minCY, maxCY)
}

export function invalidateSpatialIndex(): void {
  cache.time = -1
  cache.gameIri = ""
}
