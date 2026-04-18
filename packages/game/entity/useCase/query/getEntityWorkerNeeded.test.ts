import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { gameFactory } from "@/packages/game/game/GameInterface"
import {
  addWorkerToEntity,
  removeWorkerFromEntity,
} from "@/packages/game/entity/useCase/entityWorker"
import { expect } from "vitest"
import { getEntityWorkerNeeded } from "@/packages/game/entity/useCase/query/getEntityWorkerNeeded"
import { getEntityMetaData } from "@/packages/game/entity/useCase/getEntityMetaData"
import { ActionBagInterface } from "@/packages/game/action/ActionBagInterface"

describe("Test getEntityWorkerNeeded", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.create()
    const meta = getEntityMetaData(timberHouse)
    const worker = workerEntityResource.create()
    const numberOfWorker = meta.propriety.work?.numberOfWorker as number
    expect(getEntityWorkerNeeded(timberHouse)).toBe(numberOfWorker)
    addWorkerToEntity(game, timberHouse, worker)
    Object.values(worker.actions as ActionBagInterface).forEach((e) => {
      expect(e.createdBy).toBe(timberHouse["@id"])
    })
    expect(getEntityWorkerNeeded(timberHouse)).toBe(numberOfWorker - 1)

    expect((timberHouse.workers as []).length).toBe(1)
    expect(Object.keys(worker.actions as {}).length).toBe(1)
    removeWorkerFromEntity(timberHouse, worker)

    expect((timberHouse.workers as []).length).toBe(0)
    expect(getEntityWorkerNeeded(timberHouse)).toBe(numberOfWorker)
  })
})
