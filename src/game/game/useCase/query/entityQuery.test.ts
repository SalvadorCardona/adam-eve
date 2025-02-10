import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { gameFactory } from "@/src/game/game/GameInterface"
import { createVector3 } from "@/src/utils/math/vector"
import { treeEntityMetaData } from "@/src/game/entity/app/ressource/tree/TreeEntity"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { expect } from "vitest"
import EntityInterface from "@/src/game/entity/EntityInterface"

describe("Test entityQuery", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const worker = workerEntityMetaData.factory({
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
