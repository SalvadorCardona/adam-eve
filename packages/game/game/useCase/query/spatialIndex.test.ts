import { beforeEach, describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import {
  circleCandidates,
  invalidateSpatialIndex,
  squareCandidates,
} from "@/packages/game/game/useCase/query/spatialIndex"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"

function spawnWorkerAt(
  game: ReturnType<typeof gameFactory>,
  x: number,
  z: number,
) {
  const worker = workerEntityResource.create({
    game,
    item: { position: createVector3(x, 1, z) },
  })
  addEntityToGame(game, worker)
  return worker
}

describe("spatialIndex", () => {
  beforeEach(() => {
    invalidateSpatialIndex()
  })

  it("circleCandidates returns the entity inside the search radius", () => {
    const game = gameFactory()
    const worker = spawnWorkerAt(game, 5, 5)

    const result = circleCandidates(game, { x: 5, y: 5 }, 2)
    expect(result).toContain(worker)
  })

  it("circleCandidates excludes entities far outside the chunk range", () => {
    const game = gameFactory()
    const near = spawnWorkerAt(game, 5, 5)
    spawnWorkerAt(game, 100, 100)

    const result = circleCandidates(game, { x: 5, y: 5 }, 2)
    expect(result).toContain(near)
    expect(result.some((e) => e.position.x === 100)).toBe(false)
  })

  it("squareCandidates returns entities in the rectangle", () => {
    const game = gameFactory()
    const inside = spawnWorkerAt(game, 5, 5)
    spawnWorkerAt(game, 200, 200)

    const result = squareCandidates(game, { x: 0, y: 0 }, { x: 10, y: 10 })
    expect(result).toContain(inside)
    expect(result.some((e) => e.position.x === 200)).toBe(false)
  })

  it("rebuilds the cache when invalidated explicitly (entities moved)", () => {
    const game = gameFactory()
    const worker = spawnWorkerAt(game, 5, 5)

    expect(circleCandidates(game, { x: 5, y: 5 }, 2)).toContain(worker)

    worker.position.x = 100
    worker.position.z = 100
    invalidateSpatialIndex()

    expect(circleCandidates(game, { x: 5, y: 5 }, 2)).not.toContain(worker)
    expect(circleCandidates(game, { x: 100, y: 100 }, 2)).toContain(worker)
  })

  it("entityQuery uses the index to narrow circleSearch results", () => {
    const game = gameFactory()
    const near = spawnWorkerAt(game, 5, 5)
    spawnWorkerAt(game, 100, 100)
    spawnWorkerAt(game, 50, 50)

    const found = entityQuery(game, {
      faction: EntityFaction.self,
      circleSearch: { center: { x: 5, y: 5 }, radius: 3 },
    })

    expect(found).toEqual([near])
  })

  it("entityQuery without spatial filter still scans all entities", () => {
    const game = gameFactory()
    spawnWorkerAt(game, 5, 5)
    spawnWorkerAt(game, 100, 100)

    const all = entityQuery(game, { faction: EntityFaction.self })
    expect(all).toHaveLength(2)
  })
})
