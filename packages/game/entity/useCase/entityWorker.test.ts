import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addWorkerToEntity } from "@/packages/game/entity/useCase/entityWorker"
import { describe, expect, it } from "vitest"
import { ActionBagInterface } from "@/packages/game/action/ActionBagInterface"
import { getLdIri } from "@/packages/jsonLd/jsonLd"
import { hasAction } from "@/packages/game/action/HasAction"

describe("addWorkerToEntity", () => {
  it("adds a worker to the source entity and creates the worker action", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.create()
    const worker = workerEntityResource.create()

    expect(hasAction(worker)).toBe(false)

    addWorkerToEntity(game, timberHouse, worker)

    expect(timberHouse.workers).toHaveLength(1)
    expect(timberHouse.workers?.[0]).toBe(getLdIri(worker))
    expect(hasAction(worker)).toBe(true)
    expect(Object.keys(worker.actions ?? {})).toHaveLength(1)
    Object.values(worker.actions as ActionBagInterface).forEach((action) => {
      expect(action.createdBy).toBe(timberHouse["@id"])
    })
  })

  it("initializes the workers array when missing and assigns the action", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.create()
    delete timberHouse.workers
    const worker = workerEntityResource.create()

    addWorkerToEntity(game, timberHouse, worker)

    expect(Array.isArray(timberHouse.workers)).toBe(true)
    expect(timberHouse.workers).toHaveLength(1)
    expect(hasAction(worker)).toBe(true)
  })

  it("does nothing when the source has no workerAction defined", () => {
    const game = gameFactory()
    const worker = workerEntityResource.create()
    const sourceWithoutAction = workerEntityResource.create()

    addWorkerToEntity(game, sourceWithoutAction, worker)

    expect(sourceWithoutAction.workers).toEqual([])
    expect(hasAction(worker)).toBe(false)
  })

  it("does not add a worker when no more workers are needed", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.create()
    const maxWorkers = timberHouseEntityMetaData.propriety.work
      ?.numberOfWorker as number

    for (let i = 0; i < maxWorkers; i++) {
      addWorkerToEntity(game, timberHouse, workerEntityResource.create())
    }

    const extraWorker = workerEntityResource.create()
    addWorkerToEntity(game, timberHouse, extraWorker)

    expect(timberHouse.workers).toHaveLength(maxWorkers)
    expect(hasAction(extraWorker)).toBe(false)
  })

  it("does not assign a worker that already has an action", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.create()
    const otherSource = timberHouseEntityMetaData.create()
    const worker = workerEntityResource.create()

    addWorkerToEntity(game, otherSource, worker)
    expect(hasAction(worker)).toBe(true)
    const actionsCountBefore = Object.keys(worker.actions ?? {}).length

    addWorkerToEntity(game, timberHouse, worker)

    expect(timberHouse.workers).toHaveLength(0)
    expect(Object.keys(worker.actions ?? {})).toHaveLength(actionsCountBefore)
  })
})
