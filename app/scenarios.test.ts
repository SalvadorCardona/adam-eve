import { beforeEach, describe, expect, it } from "vitest"
import GameInterface, { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"
import { enoughResource } from "@/packages/game/inventory/useCase/enoughResource"
import { entityAttackEntity } from "@/packages/game/entity/useCase/entityAttackEntity"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityFaction, EntityFaction as Faction } from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { createVector3 } from "@/packages/math/vector"

import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { towerEntityResource } from "@/app/entity/building/tower/towerEntityResource"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { createBuilding, createCharacter, createHarvestable } from "@/packages/game/entity/createBuilding"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"

function newGame(): GameInterface {
  return gameFactory()
}

describe("Scenario: create a new game", () => {
  it("starts empty with default options", () => {
    const game = newGame()
    expect(Object.keys(game.entities)).toHaveLength(0)
    expect(Object.keys(game.actions)).toHaveLength(0)
    expect(game.time).toBe(0)
    expect(game.gameOption.gameSpeed).toBe(1)
  })

  it("processes a tick without throwing on empty state", () => {
    const game = newGame()
    gameProcessor(game)
    expect(game.time).toBe(1)
  })
})

describe("Scenario: spawn entities in a game", () => {
  let game: GameInterface

  beforeEach(() => {
    game = newGame()
  })

  it("spawns a building (forum) and registers it in the game", () => {
    const forum = forumEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, forum)

    expect(Object.keys(game.entities)).toHaveLength(1)
    const stored = entityQueryFindOne(game, { "@id": forum["@id"] })
    expect(stored).toBeTruthy()
    expect(stored?.faction).toBe(EntityFaction.self)
  })

  it("spawns a character (worker) with full health", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(1, 0, 1) },
    })
    addEntityToGame(game, worker)

    expect(worker.life).toBe(25)
    expect(worker.faction).toBe(EntityFaction.self)
    expect(worker.state).toBe(EntityState.wait)
  })

  it("spawns an enemy (zombie) with enemy faction", () => {
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(5, 0, 5) },
    })
    addEntityToGame(game, zombie)

    expect(zombie.faction).toBe(EntityFaction.enemy)
    expect(zombie.life).toBe(100)
  })
})

describe("Scenario: inventory management", () => {
  let game: GameInterface

  beforeEach(() => {
    game = newGame()
  })

  it("adds wood and gold to a worker's inventory up to its capacity", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })

    addToInventory(worker.inventory, woodResourceMetadata, 5)
    addToInventory(worker.inventory, goldResourceMetadata, 3)

    expect(getInventoryItem(worker.inventory, woodResourceMetadata).quantity).toBe(5)
    expect(getInventoryItem(worker.inventory, goldResourceMetadata).quantity).toBe(3)
  })

  it("respects inventory size limits", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })

    const added = addToInventory(worker.inventory, woodResourceMetadata, 100)

    expect(added).toBe(10)
    expect(getInventoryItem(worker.inventory, woodResourceMetadata).quantity).toBe(
      10,
    )
  })

  it("transfers resources between two inventories", () => {
    const source = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const target = workerEntityResource.create({
      game,
      item: { position: createVector3(1, 0, 0) },
    })

    addToInventory(source.inventory, woodResourceMetadata, 8)
    const moved = transfertInventoryByItem(
      source.inventory,
      target.inventory,
      woodResourceMetadata,
      5,
    )

    expect(moved).toBe(5)
    expect(getInventoryItem(source.inventory, woodResourceMetadata).quantity).toBe(3)
    expect(getInventoryItem(target.inventory, woodResourceMetadata).quantity).toBe(5)
  })
})

describe("Scenario: combat between enemies", () => {
  let game: GameInterface

  beforeEach(() => {
    game = newGame()
  })

  it("a zombie attacking a worker reduces the worker's life", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, worker)
    addEntityToGame(game, zombie)

    const initialLife = worker.life
    const didAttack = entityAttackEntity(game, zombie, worker)

    expect(didAttack).toBe(true)
    expect(worker.life).toBe(initialLife - 1)
  })

  it("an attack out of range has no effect", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(50, 0, 50) },
    })

    const didAttack = entityAttackEntity(game, zombie, worker)
    expect(didAttack).toBe(false)
    expect(worker.life).toBe(25)
  })

  it("a worker can be killed after enough hits", () => {
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })

    for (let i = 0; i < 25; i++) {
      entityAttackEntity(game, zombie, worker)
    }

    expect(worker.life).toBeLessThanOrEqual(0)
  })
})

describe("Scenario: building construction requires resources", () => {
  it("the tower's construction is satisfied once enough wood is gathered", () => {
    const game = newGame()
    const tower = towerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, tower)

    const required = towerEntityResource.propriety.resourceForConstruction!
    expect(enoughResource(required, tower.inventory)).toBe(false)

    addToInventory(tower.inventory, woodResourceMetadata, 5)

    expect(enoughResource(required, tower.inventory!)).toBe(true)
  })
})

describe("Scenario: framework ergonomics — define content from scratch", () => {
  it("createBuilding lets me declare a brand-new building inline", () => {
    const farm = createBuilding({
      "@id": "resource/test-farm",
      label: "Ferme de test",
      propriety: {
        work: { numberOfWorker: 3 },
        health: { maxLife: 80 },
        size: { x: 2, y: 1, z: 2 },
        resourceForConstruction: createInventory({
          items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 3 }],
        }),
      },
    })

    const game = newGame()
    const entity = farm.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, entity)

    expect(entity.life).toBe(80)
    expect(entity.faction).toBe(Faction.self)
    expect(farm.propriety.work?.numberOfWorker).toBe(3)
  })

  it("createCharacter lets me declare a brand-new character inline", () => {
    const spider = createCharacter({
      "@id": "resource/test-spider",
      label: "Araignée",
      propriety: {
        inventorySize: 2,
        speed: 0.05,
        attack: { damage: 3, attackRange: 1, attackSpeed: 30 },
        health: { maxLife: 15 },
        size: { x: 1, y: 1, z: 1 },
      },
      defaultEntity: () => ({ faction: Faction.enemy }),
    })

    const game = newGame()
    const entity = spider.create({
      game,
      item: { position: createVector3(2, 0, 2) },
    })

    expect(entity.life).toBe(15)
    expect(entity.faction).toBe(Faction.enemy)
    expect(entity.state).toBe(EntityState.wait)
  })

  it("createHarvestable lets me declare a brand-new harvestable resource inline", () => {
    const stone = createHarvestable({
      "@id": "resource/test-stone",
      label: "Rocher",
      propriety: {
        health: { maxLife: 40 },
        size: { x: 1, y: 1, z: 1 },
      },
    })

    const game = newGame()
    const entity = stone.create({
      game,
      item: { position: createVector3(3, 0, 3) },
    })
    addEntityToGame(game, entity)

    expect(entity.life).toBe(40)
    expect(Object.keys(game.entities)).toHaveLength(1)
  })
})

describe("Scenario: full game loop tick", () => {
  it("advances time on each tick", () => {
    const game = newGame()
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, worker)

    for (let tick = 0; tick < 10; tick++) {
      gameProcessor(game)
    }

    expect(game.time).toBe(10)
  })

  it("a zombie next to a worker kills it over enough ticks", () => {
    const game = newGame()
    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    const zombie = zombieEntityResource.create({
      game,
      item: { position: createVector3(0, 0, 0) },
    })
    addEntityToGame(game, worker)
    addEntityToGame(game, zombie)

    const beforeLife = worker.life

    for (let tick = 0; tick < 2000; tick++) {
      gameProcessor(game)
    }

    expect(worker.life).toBeLessThan(beforeLife)
  })
})
