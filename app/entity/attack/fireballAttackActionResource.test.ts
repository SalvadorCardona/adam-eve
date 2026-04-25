import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { createVector3 } from "@/packages/math/vector"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { fireballEntityResource } from "@/app/entity/attack/FireballEntityResource"

describe("fireballEntityResource", () => {
  it("damages the target and despawns even when spawned above ground level", () => {
    const game = gameFactory()

    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(5, 0, 0) },
    })
    addEntityToGame(game, zombie)

    const fireball = fireballEntityResource.create({
      game,
      item: {
        position: createVector3(0, 2, 0),
        entityAttackTargetIri: zombie["@id"],
      },
    })
    addEntityToGame(game, fireball)

    const zombieLifeBefore = zombie.life

    for (let tick = 0; tick < 1000; tick++) {
      gameProcessor(game)
      if (fireball.life <= 0) break
    }

    expect(fireball.life).toBeLessThanOrEqual(0)
    expect(zombie.life).toBeLessThan(zombieLifeBefore)
    expect(game.entities[fireball["@id"]]).toBeUndefined()
  })

  it("despawns if the target no longer exists", () => {
    const game = gameFactory()

    const fireball = fireballEntityResource.create({
      game,
      item: {
        position: createVector3(0, 2, 0),
        entityAttackTargetIri: "resource/zombie/does-not-exist",
      },
    })
    addEntityToGame(game, fireball)

    gameProcessor(game)

    expect(fireball.life).toBeLessThanOrEqual(0)
    expect(game.entities[fireball["@id"]]).toBeUndefined()
  })

  it("moves horizontally toward the target each tick", () => {
    const game = gameFactory()

    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(10, 0, 0) },
    })
    addEntityToGame(game, zombie)

    const fireball = fireballEntityResource.create({
      game,
      item: {
        position: createVector3(0, 0, 0),
        entityAttackTargetIri: zombie["@id"],
      },
    })
    addEntityToGame(game, fireball)

    const xBefore = fireball.position.x
    gameProcessor(game)
    const xAfterOne = fireball.position.x
    gameProcessor(game)
    const xAfterTwo = fireball.position.x

    expect(xAfterOne).toBeGreaterThan(xBefore)
    expect(xAfterTwo).toBeGreaterThan(xAfterOne)
  })

  it("descends toward the target when spawned above it", () => {
    const game = gameFactory()

    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(10, 0, 0) },
    })
    addEntityToGame(game, zombie)

    const fireball = fireballEntityResource.create({
      game,
      item: {
        position: createVector3(0, 5, 0),
        entityAttackTargetIri: zombie["@id"],
      },
    })
    addEntityToGame(game, fireball)

    const yBefore = fireball.position.y
    gameProcessor(game)

    expect(fireball.position.y).toBeLessThan(yBefore)
  })

  it("despawns when its target dies before impact", () => {
    const game = gameFactory()

    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(20, 0, 0) },
    })
    addEntityToGame(game, zombie)

    const fireball = fireballEntityResource.create({
      game,
      item: {
        position: createVector3(0, 1, 0),
        entityAttackTargetIri: zombie["@id"],
      },
    })
    addEntityToGame(game, fireball)

    zombie.life = 0
    gameProcessor(game)

    expect(fireball.life).toBeLessThanOrEqual(0)
    expect(game.entities[fireball["@id"]]).toBeUndefined()
  })
})
