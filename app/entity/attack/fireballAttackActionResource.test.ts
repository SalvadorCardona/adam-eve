import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { createVector3 } from "@/packages/math/vector"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { fireballEntityResource } from "@/app/entity/attack/FireballEntityResource"

describe("fireballAttackActionResource", () => {
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
  })
})
