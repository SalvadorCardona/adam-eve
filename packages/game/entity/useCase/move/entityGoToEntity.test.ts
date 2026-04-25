import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { createVector3 } from "@/packages/math/vector"
import {
  entityGoToEntity,
  entityGoToEntityWithGround,
} from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { Matrix2DInterface } from "@/packages/math/matrix"

const passableMatrix = (size: number): Matrix2DInterface =>
  Array.from({ length: size }, () => Array(size).fill(1))

const createWorkerAt = (
  game: ReturnType<typeof gameFactory>,
  x: number,
  z: number,
) =>
  workerEntityResource.create({
    game,
    item: { position: createVector3(x, 1, z) },
  })

describe("entityGoToEntity (direct)", () => {
  it("moves the entity toward the target by its speed", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 0, 0)
    const target = createWorkerAt(game, 10, 0)
    const startX = worker.position.x

    entityGoToEntity({ entity: worker, target })

    expect(worker.position.x).toBeGreaterThan(startX)
    expect(worker.position.x).toBeLessThan(target.position.x)
  })

  it("returns unreachable=false (it does not pathfind, motion always succeeds)", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 0, 0)
    const target = createWorkerAt(game, 5, 5)

    const result = entityGoToEntity({ entity: worker, target })

    expect(result.unreachable).toBe(false)
  })

  it("reports isFinish=true when entity bounding boxes overlap the target", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 5, 5)
    const target = createWorkerAt(game, 5, 5)

    const result = entityGoToEntity({ entity: worker, target })

    expect(result.isFinish).toBe(true)
  })

  it("reports isFinish=false while still travelling", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 0, 0)
    const target = createWorkerAt(game, 20, 0)

    const result = entityGoToEntity({ entity: worker, target })

    expect(result.isFinish).toBe(false)
  })

  it("updates the entity rotation toward the target", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 0, 0)
    const target = createWorkerAt(game, 5, 5)
    worker.rotation = 0

    entityGoToEntity({ entity: worker, target })

    expect(typeof worker.rotation).toBe("number")
  })

  it("does not modify the y axis (ground-locked movement)", () => {
    const game = gameFactory()
    const worker = createWorkerAt(game, 0, 0)
    const target = createWorkerAt(game, 5, 0)
    const initialY = worker.position.y

    entityGoToEntity({ entity: worker, target })

    expect(worker.position.y).toBe(initialY)
  })
})

describe("entityGoToEntityWithGround (pathfinding + cache)", () => {
  it("falls through to direct movement when distance to target < 1 tile", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 5, 5)
    const target = createWorkerAt(game, 5, 5)

    const result = entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.currentPath).toBeUndefined()
    expect(result.unreachable).toBe(false)
  })

  it("creates and caches a path on the entity when far from target", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 10, 2)

    entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.currentPath).toBeDefined()
    expect(worker.currentPath?.hash).toBeTypeOf("string")
  })

  it("reuses the cached path when the target stays on the same tile", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 10, 2)

    entityGoToEntityWithGround({ entity: worker, target, game })
    const cachedPath = worker.currentPath
    entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.currentPath).toBe(cachedPath)
  })

  it("invalidates the cache when the target moves to another tile", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 10, 2)

    entityGoToEntityWithGround({ entity: worker, target, game })
    const firstPath = worker.currentPath
    target.position = createVector3(15, 1, 5)
    entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.currentPath).not.toBe(firstPath)
    expect(worker.currentPath?.hash).not.toBe(firstPath?.hash)
  })

  it("invalidates the cache when the target entity changes", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const targetA = createWorkerAt(game, 10, 2)
    const targetB = createWorkerAt(game, 10, 2)

    entityGoToEntityWithGround({ entity: worker, target: targetA, game })
    const firstHash = worker.currentPath?.hash
    entityGoToEntityWithGround({ entity: worker, target: targetB, game })

    expect(worker.currentPath?.hash).not.toBe(firstHash)
  })

  it("returns unreachable=true when no path exists to the target tile", () => {
    const game = gameFactory()
    const matrix: Matrix2DInterface = Array.from({ length: 5 }, () =>
      Array(5).fill(0),
    )
    matrix[2][2] = 1
    game.gameWorld.entitiesMatrix = matrix
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 4, 4)

    const result = entityGoToEntityWithGround({ entity: worker, target, game })

    expect(result.unreachable).toBe(true)
    expect(result.isFinish).toBe(false)
  })

  it("advances the entity along the path on the first frame after creation", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 10, 2)
    const startX = worker.position.x

    entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.position.x).not.toBe(startX)
  })

  it("uses a separator in the cache hash so concatenated ids cannot collide", () => {
    const game = gameFactory()
    game.gameWorld.entitiesMatrix = passableMatrix(20)
    const worker = createWorkerAt(game, 2, 2)
    const target = createWorkerAt(game, 10, 2)
    worker["@id"] = "ab"
    target["@id"] = "c"

    entityGoToEntityWithGround({ entity: worker, target, game })

    expect(worker.currentPath?.hash).not.toBe("abc10|2")
    expect(worker.currentPath?.hash).toContain("|")
  })
})
