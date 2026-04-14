import { workerEntityResource } from "@/packages/game/entity/app/character/worker/workerEntityResource"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { createVector3 } from "@/packages/math/vector"
import { treeEntityMetaData } from "@/packages/game/entity/app/resource/tree/TreeEntity"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { expect } from "vitest"
import EntityInterface from "@/packages/game/entity/EntityInterface"

describe("Test entityQuery", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const worker = workerEntityResource.factory({
      game,
      entity: { position: createVector3(1, 1, 1) },
    })
    const three1 = treeEntityMetaData.factory({
      game,
      entity: { position: createVector3(10, 1, 10) },
    })
    const three2 = treeEntityMetaData.factory({
      game,
      entity: { position: createVector3(2, 1, 2) },
    })
    const three3 = treeEntityMetaData.factory({
      game,
      entity: { position: createVector3(4, 2, 4) },
    })
    const entities = [worker, three1, three2, three3]
    entities.forEach((e) => addEntityToGame(game, e))

    const entityResult = entityQueryFindOne(game, {
      findClosestOf: { position: worker.position },
      "@idIsNot": worker["@id"],
    })

    expect((entityResult as EntityInterface)["@id"]).toBe(three2["@id"])
  })
})
