import GameInterface from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { houseEntityMetaData } from "@/app/entity/building/house/houseEntity"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { researchCenterEntityResource } from "@/app/entity/building/researchCenter/researchCenterEntityResource"
import { forumEntityResource } from "@/app/entity/building/forum/forumEntityResource"
import { EntityState } from "@/packages/game/entity/EntityState"

const ISLAND_CENTER_X = 10
const ISLAND_CENTER_Z = 10
const ISLAND_RADIUS = 6

function generateGround(game: GameInterface): void {
  for (
    let x = ISLAND_CENTER_X - ISLAND_RADIUS;
    x <= ISLAND_CENTER_X + ISLAND_RADIUS;
    x++
  ) {
    for (
      let z = ISLAND_CENTER_Z - ISLAND_RADIUS;
      z <= ISLAND_CENTER_Z + ISLAND_RADIUS;
      z++
    ) {
      const dx = x - ISLAND_CENTER_X
      const dz = z - ISLAND_CENTER_Z
      if (dx * dx + dz * dz > ISLAND_RADIUS * ISLAND_RADIUS) continue
      const grass = grassGroundEntityMetadata.create({
        game,
        item: { position: createVector3(x, 0, z) },
      })
      addEntityToGame(game, grass)
    }
  }
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

  const workerPositions: Array<[number, number]> = [
    [ISLAND_CENTER_X - 3, ISLAND_CENTER_Z],
    [ISLAND_CENTER_X + 2, ISLAND_CENTER_Z],
    [ISLAND_CENTER_X, ISLAND_CENTER_Z - 3],
    [ISLAND_CENTER_X + 2, ISLAND_CENTER_Z + 2],
    [ISLAND_CENTER_X - 3, ISLAND_CENTER_Z + 2],
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
    [ISLAND_CENTER_X - 5, ISLAND_CENTER_Z + 4],
  ]
  for (const [x, z] of goldPositions) {
    spawnAt(game, goldResourceEntityResource, x, z)
  }

  return game
}
