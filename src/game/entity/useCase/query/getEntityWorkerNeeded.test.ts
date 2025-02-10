import { timberHouseEntityMetaData } from "@/src/game/entity/app/building/timberHouse/TimberHouseEntity"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { gameFactory } from "@/src/game/game/GameInterface"
import {
  addWorkerToEntity,
  removeWorkerFromEntity,
} from "@/src/game/entity/useCase/entityWorker"
import { expect } from "vitest"
import { getEntityWorkerNeeded } from "@/src/game/entity/useCase/query/getEntityWorkerNeeded"
import { getEntityMetaData } from "@/src/game/entity/useCase/getEntityMetaData"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"

describe("Test getEntityWorkerNeeded", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const timberHouse = timberHouseEntityMetaData.factory()
    const meta = getEntityMetaData(timberHouse)
    const worker = workerEntityMetaData.factory()
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
