import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import { updateFogOfWar } from "@/packages/game/game/useCase/updateFogOfWar"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"

function seedGround(game: ReturnType<typeof gameFactory>, size: number): void {
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const tile = grassGroundEntityMetadata.create({
        game,
        item: { position: createVector3(x, 0, z) },
      })
      addEntityToGame(game, tile)
    }
  }
}

describe("updateFogOfWar", () => {
  it("does nothing when the world has no bounding", () => {
    const game = gameFactory()
    updateFogOfWar(game)
    expect(game.gameWorld.visitedMatrix).toBeUndefined()
  })

  it("reveals cells in a disc of vision-range around an allied entity", () => {
    const game = gameFactory()
    seedGround(game, 20)

    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(10, 1, 10) },
    })
    addEntityToGame(game, worker)

    updateFogOfWar(game)

    const matrix = game.gameWorld.visitedMatrix
    expect(matrix).toBeDefined()
    expect(matrix?.[10]?.[10]).toBe(true)
    expect(matrix?.[10]?.[11]).toBe(true)
    expect(matrix?.[8]?.[10]).toBe(true)
  })

  it("does not reveal cells beyond vision range", () => {
    const game = gameFactory()
    seedGround(game, 20)

    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(10, 1, 10) },
    })
    addEntityToGame(game, worker)

    updateFogOfWar(game)

    const matrix = game.gameWorld.visitedMatrix!
    expect(matrix[10]?.[19]).toBeFalsy()
    expect(matrix[19]?.[10]).toBeFalsy()
    expect(matrix[0]?.[0]).toBeFalsy()
  })

  it("ignores entities of the enemy faction", () => {
    const game = gameFactory()
    seedGround(game, 20)

    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(10, 1, 10) },
    })
    addEntityToGame(game, zombie)

    updateFogOfWar(game)

    const matrix = game.gameWorld.visitedMatrix
    if (matrix) {
      for (const row of matrix) {
        if (!row) continue
        for (const cell of row) {
          expect(cell).toBeFalsy()
        }
      }
    }
  })

  it("keeps a previously revealed cell revealed even when the entity moves away", () => {
    const game = gameFactory()
    seedGround(game, 20)

    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(5, 1, 5) },
    })
    addEntityToGame(game, worker)

    updateFogOfWar(game)
    expect(game.gameWorld.visitedMatrix?.[5]?.[5]).toBe(true)

    worker.position.x = 15
    worker.position.z = 15
    updateFogOfWar(game)

    expect(game.gameWorld.visitedMatrix?.[5]?.[5]).toBe(true)
    expect(game.gameWorld.visitedMatrix?.[15]?.[15]).toBe(true)
  })
})
