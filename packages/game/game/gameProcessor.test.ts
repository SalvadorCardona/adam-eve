import { describe, expect, it, vi } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createCharacter } from "@/packages/game/entity/createBuilding"
import { createActionResource } from "@/packages/game/action/createActionResource"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"
import { updateNextTick } from "@/packages/game/action/updateNextTick"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"

const onFrameSpy = vi.fn()

const testEntityResource = createCharacter({
  "@id": "resource/test-processor-entity",
  onFrame: onFrameSpy,
  defaultEntity: () => ({ faction: EntityFaction.self }),
})

describe("gameProcessor", () => {
  it("increments game.time on each tick", () => {
    const game = gameFactory()
    const start = game.time

    gameProcessor(game)
    gameProcessor(game)
    gameProcessor(game)

    expect(game.time).toBe(start + 3)
  })

  it("returns the same game instance (mutation in place)", () => {
    const game = gameFactory()
    const result = gameProcessor(game)
    expect(result).toBe(game)
  })

  it("calls onFrame for each live entity", () => {
    const game = gameFactory()
    onFrameSpy.mockClear()

    addEntityToGame(game, testEntityResource.create())
    addEntityToGame(game, testEntityResource.create())

    gameProcessor(game)

    expect(onFrameSpy).toHaveBeenCalledTimes(2)
  })

  it("runs actions in game.actions bag", () => {
    const game = gameFactory()
    const callback = vi.fn()

    const testAction = createActionResource<ActionResourceInterface>({
      "@id": "action/test-game-bag",
      onFrame: callback,
    })

    const action = testAction.create()
    game.actions[action["@id"]] = action

    gameProcessor(game)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("skips actions whose nextTick is in the future", () => {
    const game = gameFactory()
    const callback = vi.fn()

    const testAction = createActionResource<ActionResourceInterface>({
      "@id": "action/test-skip",
      onFrame: ({ action, game: g }) => {
        callback()
        updateNextTick(g, action, 5)
      },
    })

    const action = testAction.create()
    game.actions[action["@id"]] = action

    gameProcessor(game)
    expect(callback).toHaveBeenCalledTimes(1)

    gameProcessor(game)
    gameProcessor(game)
    expect(callback).toHaveBeenCalledTimes(1)

    for (let i = 0; i < 5; i++) gameProcessor(game)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("runs actions attached to an entity", () => {
    const game = gameFactory()
    onFrameSpy.mockClear()

    const entity = testEntityResource.create()
    const callback = vi.fn()
    const entityAction = createActionResource<ActionResourceInterface>({
      "@id": "action/test-entity-bag",
      onFrame: callback,
    })
    const action = entityAction.create()
    entity.actions = { [action["@id"]]: action }

    addEntityToGame(game, entity)

    gameProcessor(game)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0].entity).toBe(entity)
  })
})
