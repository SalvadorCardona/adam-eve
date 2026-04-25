import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { createVector3 } from "@/packages/math/vector"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import {
  entityQueryFindOne,
  entityQuery,
} from "@/packages/game/game/useCase/query/entityQuery"
import { expect } from "vitest"
import EntityInterface from "@/packages/game/entity/EntityInterface"

describe("Test entityQuery", () => {
  it("Context 1", () => {
    const game = gameFactory()
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(1, 1, 1) },
    })
    const three1 = treeEntityMetaData.create({
      game,
      item: { position: createVector3(10, 1, 10) },
    })
    const three2 = treeEntityMetaData.create({
      game,
      item: { position: createVector3(2, 1, 2) },
    })
    const three3 = treeEntityMetaData.create({
      game,
      item: { position: createVector3(4, 2, 4) },
    })
    const entities = [worker, three1, three2, three3]
    entities.forEach((e) => addEntityToGame(game, e))

    const entityResult = entityQueryFindOne(game, {
      findClosestOf: { position: worker.position },
      "@idIsNot": worker["@id"],
    })

    expect((entityResult as EntityInterface)["@id"]).toBe(three2["@id"])
  })

  it("circleSearch returns entities within the radius and excludes those outside", () => {
    const game = gameFactory()
    const inside = treeEntityMetaData.create({
      game,
      item: { position: createVector3(3, 0, 4) },
    })
    const onBoundary = treeEntityMetaData.create({
      game,
      item: { position: createVector3(5, 0, 0) },
    })
    const outside = treeEntityMetaData.create({
      game,
      item: { position: createVector3(10, 0, 10) },
    })
    ;[inside, onBoundary, outside].forEach((e) => addEntityToGame(game, e))

    const result = entityQuery(game, {
      circleSearch: { center: { x: 0, y: 0 }, radius: 5 },
    })

    const ids = result.map((e) => e["@id"])
    expect(ids).toContain(inside["@id"])
    expect(ids).toContain(onBoundary["@id"])
    expect(ids).not.toContain(outside["@id"])
  })
})
