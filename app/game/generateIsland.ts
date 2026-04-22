import GameInterface from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { houseEntityMetaData } from "@/app/entity/building/house/houseEntity"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { goldMineBuildMetaDataEntity } from "@/app/entity/resource/gold/GoldMineBuildingEntityResource"
import { researchCenterEntityResource } from "@/app/entity/building/researchCenter/researchCenterEntityResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { forestierEntityResource } from "@/app/entity/building/forestier/forestierEntityResource"
import { timberHouseEntityMetaData } from "@/app/entity/building/timberHouse/TimberHouseEntity"
import { towerEntityResource } from "@/app/entity/building/tower/towerEntityResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { EntityState } from "@/packages/game/entity/EntityState"

const ISLAND_CENTER_X = 10
const ISLAND_CENTER_Z = 10
const ISLAND_RADIUS = 6

const ZOMBIE_ISLAND_CENTER_X = 26
const ZOMBIE_ISLAND_CENTER_Z = 10
const ZOMBIE_ISLAND_RADIUS = 5

const BRIDGE_START_X = ISLAND_CENTER_X + ISLAND_RADIUS + 1
const BRIDGE_END_X = ZOMBIE_ISLAND_CENTER_X - ZOMBIE_ISLAND_RADIUS - 1
const BRIDGE_MIN_Z = ISLAND_CENTER_Z - 1
const BRIDGE_MAX_Z = ISLAND_CENTER_Z + 1

function generateCircularGround(
  game: GameInterface,
  centerX: number,
  centerZ: number,
  radius: number,
): void {
  for (let x = centerX - radius; x <= centerX + radius; x++) {
    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
      const dx = x - centerX
      const dz = z - centerZ
      if (dx * dx + dz * dz > radius * radius) continue
      const grass = grassGroundEntityMetadata.create({
        game,
        item: { position: createVector3(x, 0, z) },
      })
      addEntityToGame(game, grass)
    }
  }
}

function generateBridge(game: GameInterface): void {
  for (let x = BRIDGE_START_X; x <= BRIDGE_END_X; x++) {
    for (let z = BRIDGE_MIN_Z; z <= BRIDGE_MAX_Z; z++) {
      const grass = grassGroundEntityMetadata.create({
        game,
        item: { position: createVector3(x, 0, z) },
      })
      addEntityToGame(game, grass)
    }
  }
}

function generateGround(game: GameInterface): void {
  generateCircularGround(game, ISLAND_CENTER_X, ISLAND_CENTER_Z, ISLAND_RADIUS)
  generateCircularGround(
    game,
    ZOMBIE_ISLAND_CENTER_X,
    ZOMBIE_ISLAND_CENTER_Z,
    ZOMBIE_ISLAND_RADIUS,
  )
  generateBridge(game)
}

function spawnAt(
  game: GameInterface,
  resource: { create: (payload: any) => any },
  x: number,
  z: number,
): void {
  const entity = resource.create({
    game,
    item: { position: createVector3(x, 1, z) },
  })
  addEntityToGame(game, entity)
}

function spawnBuildingAt(
  game: GameInterface,
  resource: { create: (payload: any) => any },
  x: number,
  z: number,
): void {
  const entity = resource.create({
    game,
    item: { position: createVector3(x, 1, z) },
  })

  entity.state = EntityState.builded
  addEntityToGame(game, entity)
}

export function generateIsland(game: GameInterface): GameInterface {
  generateGround(game)

  spawnBuildingAt(
    game,
    houseEntityMetaData,
    ISLAND_CENTER_X - 1,
    ISLAND_CENTER_Z - 1,
  )
  spawnBuildingAt(
    game,
    researchCenterEntityResource,
    ISLAND_CENTER_X + 2,
    ISLAND_CENTER_Z - 3,
  )
  spawnBuildingAt(
    game,
    forumEntityResource,
    ISLAND_CENTER_X + 3,
    ISLAND_CENTER_Z + 1,
  )

  spawnBuildingAt(
    game,
    goldMineBuildMetaDataEntity,
    ISLAND_CENTER_X - 3,
    ISLAND_CENTER_Z - 3,
  )

  spawnBuildingAt(
    game,
    timberHouseEntityMetaData,
    ISLAND_CENTER_X - 4,
    ISLAND_CENTER_Z + 1,
  )

  spawnBuildingAt(
    game,
    forestierEntityResource,
    ISLAND_CENTER_X - 1,
    ISLAND_CENTER_Z + 4,
  )

  spawnBuildingAt(
    game,
    towerEntityResource,
    ISLAND_CENTER_X + ISLAND_RADIUS - 1,
    ISLAND_CENTER_Z - 2,
  )
  spawnBuildingAt(
    game,
    towerEntityResource,
    ISLAND_CENTER_X + ISLAND_RADIUS - 1,
    ISLAND_CENTER_Z + 2,
  )

  const workerPositions: Array<[number, number]> = [
    [ISLAND_CENTER_X - 3, ISLAND_CENTER_Z],
    [ISLAND_CENTER_X + 2, ISLAND_CENTER_Z],
    [ISLAND_CENTER_X, ISLAND_CENTER_Z - 3],
    [ISLAND_CENTER_X + 2, ISLAND_CENTER_Z + 2],
    [ISLAND_CENTER_X - 3, ISLAND_CENTER_Z + 2],
    [ISLAND_CENTER_X + 1, ISLAND_CENTER_Z + 3],
    [ISLAND_CENTER_X - 2, ISLAND_CENTER_Z - 2],
  ]
  for (const [x, z] of workerPositions) {
    spawnAt(game, workerEntityResource, x, z)
  }

  const treePositions: Array<[number, number]> = [
    [ISLAND_CENTER_X - 5, ISLAND_CENTER_Z - 2],
    [ISLAND_CENTER_X - 4, ISLAND_CENTER_Z + 4],
    [ISLAND_CENTER_X + 4, ISLAND_CENTER_Z - 3],
    [ISLAND_CENTER_X + 4, ISLAND_CENTER_Z + 4],
    [ISLAND_CENTER_X - 2, ISLAND_CENTER_Z + 5],
  ]

  for (const [x, z] of treePositions) {
    spawnAt(game, treeEntityMetaData, x, z)
  }

  const goldPositions: Array<[number, number]> = [
    [ISLAND_CENTER_X + 5, ISLAND_CENTER_Z + 1],
    [ISLAND_CENTER_X - 4, ISLAND_CENTER_Z + 3],
  ]
  for (const [x, z] of goldPositions) {
    spawnAt(game, goldResourceEntityResource, x, z)
  }

  const zombiePositions: Array<[number, number]> = [
    [ZOMBIE_ISLAND_CENTER_X, ZOMBIE_ISLAND_CENTER_Z],
    [ZOMBIE_ISLAND_CENTER_X - 2, ZOMBIE_ISLAND_CENTER_Z - 1],
    [ZOMBIE_ISLAND_CENTER_X + 2, ZOMBIE_ISLAND_CENTER_Z + 1],
    [ZOMBIE_ISLAND_CENTER_X + 1, ZOMBIE_ISLAND_CENTER_Z - 2],
    [ZOMBIE_ISLAND_CENTER_X - 1, ZOMBIE_ISLAND_CENTER_Z + 2],
  ]
  for (const [x, z] of zombiePositions) {
    spawnAt(game, zombieEntityResource, x, z)
  }

  return game
}
