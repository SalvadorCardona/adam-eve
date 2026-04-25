import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { daycareEntityResource } from "@/app/entity/building/daycare/daycareEntityResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { createVector3 } from "@/packages/math/vector"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { addActionToEntity } from "@/packages/game/action/AddActionToEntity"
import { EntityState } from "@/packages/game/entity/EntityState"
import { ActionInterface } from "@/packages/game/action/ActionResourceInterface"

type BuildAction = ActionInterface<{ state?: string; buildingIri?: string }>
import { hasAction } from "@/packages/game/action/HasAction"
import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"
import { Matrix2DInterface } from "@/packages/math/matrix"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"

const passableMatrix = (size: number): Matrix2DInterface =>
  Array.from({ length: size }, () => Array(size).fill(1))

interface Setup {
  game: GameInterface
  forum: EntityInterface
  building: EntityInterface
  worker: EntityInterface
  action: BuildAction
}

function setupBuildScenario(
  options: {
    workerAt?: [number, number]
    forumAt?: [number, number]
    buildingAt?: [number, number]
    gameWood?: number
    skipBuilding?: boolean
    skipForum?: boolean
  } = {},
): Setup {
  const game = gameFactory()

  const [fx, fz] = options.forumAt ?? [0, 0]
  const forum = forumEntityResource.create({
    game,
    item: { position: createVector3(fx, 1, fz) },
  })
  if (!options.skipForum) addEntityToGame(game, forum)

  const [bx, bz] = options.buildingAt ?? [10, 0]
  const building = daycareEntityResource.create({
    game,
    item: { position: createVector3(bx, 1, bz) },
  })
  if (!options.skipBuilding) addEntityToGame(game, building)

  const [wx, wz] = options.workerAt ?? [5, 0]
  const worker = workerEntityResource.create({
    game,
    item: { position: createVector3(wx, 1, wz) },
  })
  addEntityToGame(game, worker)

  if (options.gameWood !== undefined) {
    addToInventory(game.inventory, woodResourceMetadata["@id"], options.gameWood)
  }

  game.gameWorld.entitiesMatrix = passableMatrix(30)

  const action = goBuildOfBuildingActionResource.create({
    item: { createdBy: forum["@id"] },
  }) as BuildAction
  addActionToEntity(worker, action)

  return { game, forum, building, worker, action }
}

function runOnFrame(s: Setup): void {
  goBuildOfBuildingActionResource.onFrame!({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: s.action as any,
    game: s.game,
    entity: s.worker,
  })
}

describe("goBuildOfBuildingActionResource", () => {
  it("defaults data.state to GoToForum on first run", () => {
    const s = setupBuildScenario()
    expect(s.action.data.state).toBeUndefined()

    runOnFrame(s)

    expect(s.action.data.state).toBe("GoToForum")
  })

  it("sets entity state to move while travelling to the forum", () => {
    const s = setupBuildScenario({ workerAt: [5, 0], forumAt: [0, 0] })

    runOnFrame(s)

    expect(s.worker.state).toBe(EntityState.move)
    expect(s.action.data.state).toBe("GoToForum")
  })

  it("transitions GoToForum → TakeResource when worker reaches the forum", () => {
    const s = setupBuildScenario({ workerAt: [0, 0], forumAt: [0, 0] })

    runOnFrame(s)

    expect(s.action.data.state).toBe("TakeResource")
  })

  it("transitions TakeResource → GoToBuild and transfers wood to the worker when game has wood", () => {
    const s = setupBuildScenario({
      workerAt: [0, 0],
      forumAt: [0, 0],
      gameWood: 8,
    })
    s.action.data.state = "TakeResource"

    runOnFrame(s)

    expect(s.action.data.state).toBe("GoToBuild")
    const carried = getInventoryItem(s.worker.inventory, woodResourceMetadata["@id"])
    expect(carried.quantity).toBeGreaterThan(0)
  })

  it("stays in TakeResource and idles the worker when game inventory is empty", () => {
    const s = setupBuildScenario({
      workerAt: [0, 0],
      forumAt: [0, 0],
      gameWood: 0,
    })
    s.action.data.state = "TakeResource"

    runOnFrame(s)

    expect(s.action.data.state).toBe("TakeResource")
    expect(s.worker.state).toBe(EntityState.wait)
  })

  it("transitions GoToBuild → PutResource when worker reaches the building", () => {
    const s = setupBuildScenario({
      workerAt: [10, 0],
      buildingAt: [10, 0],
    })
    s.action.data.state = "GoToBuild"

    runOnFrame(s)

    expect(s.action.data.state).toBe("PutResource")
  })

  it("PutResource transfers worker inventory into building and goes back to GoToForum if not enough", () => {
    const s = setupBuildScenario({
      workerAt: [10, 0],
      buildingAt: [10, 0],
    })
    addToInventory(s.worker.inventory, woodResourceMetadata["@id"], 3)
    s.action.data.state = "PutResource"

    runOnFrame(s)

    expect(s.action.data.state).toBe("GoToForum")
    const inBuilding = getInventoryItem(
      s.building.inventory,
      woodResourceMetadata["@id"],
    )
    expect(inBuilding.quantity).toBe(3)
  })

  it("PutResource marks the building as built and lets the worker keep looking for more work", () => {
    const s = setupBuildScenario({
      workerAt: [10, 0],
      buildingAt: [10, 0],
    })
    addToInventory(s.worker.inventory, woodResourceMetadata["@id"], 8)
    s.forum.workers = [s.worker["@id"]]
    s.action.data.state = "PutResource"

    runOnFrame(s)

    expect(s.building.state).toBe(EntityState.builded)
    expect(s.action.data.state).toBe("GoToForum")
    expect(s.action.data.buildingIri).toBeUndefined()
    expect(hasAction(s.worker)).toBe(true)
    expect(s.forum.workers).toContain(s.worker["@id"])
  })

  it("idles the worker but keeps the action when no under-construction building exists", () => {
    const s = setupBuildScenario({ skipBuilding: true })
    s.forum.workers = [s.worker["@id"]]

    runOnFrame(s)

    expect(hasAction(s.worker)).toBe(true)
    expect(s.worker.state).toBe(EntityState.wait)
    expect(s.action.data.state).toBe("GoToForum")
    expect(s.forum.workers).toContain(s.worker["@id"])
  })

  it("idles the worker without transitioning when no forum exists", () => {
    const s = setupBuildScenario({ skipForum: true })

    runOnFrame(s)

    expect(s.worker.state).toBe(EntityState.wait)
    expect(s.action.data.state).toBe("GoToForum")
    expect(hasAction(s.worker)).toBe(true)
  })
})
