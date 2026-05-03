import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { createVector3 } from "@/packages/math/vector"
import { EntityState } from "@/packages/game/entity/EntityState"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"

describe("zombieAttackActionResource", () => {
  it("stays in wait state when no enemy is around", () => {
    const game = gameFactory()
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, zombie)

    gameProcessor(game)

    expect(zombie.state).toBe(EntityState.wait)
    expect(zombie.entityAttackTargetIri).toBeUndefined()
  })

  it("acquires a worker as target and damages it when in range", () => {
    const game = gameFactory()
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, worker)
    addEntityToGame(game, zombie)

    const initialLife = worker.life

    gameProcessor(game)

    expect(zombie.entityAttackTargetIri).toBe(worker["@id"])
    expect(zombie.state).toBe(EntityState.attack)
    expect(worker.life).toBeLessThan(initialLife)
  })

  it("clears the target reference once the target is dead", () => {
    const game = gameFactory()
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, worker)
    addEntityToGame(game, zombie)

    gameProcessor(game)
    expect(zombie.entityAttackTargetIri).toBe(worker["@id"])

    removeEntityToGame(game, worker)

    for (let tick = 0; tick < 200; tick++) {
      gameProcessor(game)
      if (zombie.state === EntityState.wait) break
    }

    expect(zombie.entityAttackTargetIri).toBeUndefined()
    expect(zombie.state).toBe(EntityState.wait)
  })

  it("switches to a live target instead of attacking a corpse with life <= 0", () => {
    const game = gameFactory()
    const firstWorker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const secondWorker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 1) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, firstWorker)
    addEntityToGame(game, secondWorker)
    addEntityToGame(game, zombie)

    // Drive the zombie to kill the first worker without removing it from the
    // game (mimicking the real game where theDeathActionResource only runs
    // every 20 ticks, so corpses linger briefly).
    firstWorker.life = 0

    for (let tick = 0; tick < 200; tick++) {
      gameProcessor(game)
      if (zombie.entityAttackTargetIri === secondWorker["@id"]) break
    }

    expect(zombie.entityAttackTargetIri).toBe(secondWorker["@id"])
  })

  it("re-acquires a new target after the previous one dies", () => {
    const game = gameFactory()
    const firstWorker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, firstWorker)
    addEntityToGame(game, zombie)

    gameProcessor(game)
    expect(zombie.entityAttackTargetIri).toBe(firstWorker["@id"])

    removeEntityToGame(game, firstWorker)

    const secondWorker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, secondWorker)

    for (let tick = 0; tick < 200; tick++) {
      gameProcessor(game)
      if (zombie.entityAttackTargetIri === secondWorker["@id"]) break
    }

    expect(zombie.entityAttackTargetIri).toBe(secondWorker["@id"])
  })
})
