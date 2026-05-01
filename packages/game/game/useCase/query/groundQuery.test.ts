import { describe, expect, it } from "vitest"
import { gameFactory } from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import {
  findTileUnderEntity,
  getTileAtCell,
  hasTileAtCell,
} from "@/packages/game/game/useCase/query/groundQuery"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { roadGroundEntityMetadata } from "@/app/entity/ground/road/roadGroundEntityMetadata"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { towerEntityResource } from "@/app/entity/building/tower/towerEntityResource"

function placeGrass(
  game: ReturnType<typeof gameFactory>,
  x: number,
  z: number,
): void {
  const tile = grassGroundEntityMetadata.create({
    game,
    item: { position: createVector3(x, 0, z) },
  })
  addEntityToGame(game, tile)
}

describe("ground tile system (matrix-backed)", () => {
  it("does not store ground entities in game.entities", () => {
    const game = gameFactory()
    placeGrass(game, 3, 4)
    placeGrass(game, 5, 6)

    expect(Object.keys(game.entities)).toHaveLength(0)
  })

  it("writes the tile @type into groundMatrix at the placed cell", () => {
    const game = gameFactory()
    placeGrass(game, 3, 4)

    expect(getTileAtCell(game, { x: 3, y: 4 })).toBe(
      grassGroundEntityMetadata["@id"],
    )
  })

  it("returns undefined for unfilled cells", () => {
    const game = gameFactory()
    placeGrass(game, 3, 4)

    expect(getTileAtCell(game, { x: 0, y: 0 })).toBeUndefined()
    expect(hasTileAtCell(game, { x: 10, y: 10 })).toBe(false)
  })

  it("supports multiple tile types side by side", () => {
    const game = gameFactory()
    placeGrass(game, 1, 1)
    const road = roadGroundEntityMetadata.create({
      game,
      item: { position: createVector3(2, 0, 1) },
    })
    addEntityToGame(game, road)

    expect(getTileAtCell(game, { x: 1, y: 1 })).toBe(
      grassGroundEntityMetadata["@id"],
    )
    expect(getTileAtCell(game, { x: 2, y: 1 })).toBe(
      roadGroundEntityMetadata["@id"],
    )
  })

  it("findTileUnderEntity returns the tile under a 1×1 entity footprint", () => {
    const game = gameFactory()
    placeGrass(game, 5, 5)

    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(5, 1, 5) },
    })

    expect(findTileUnderEntity(game, worker)).toBe(
      grassGroundEntityMetadata["@id"],
    )
  })

  it("findTileUnderEntity returns undefined when the entity is over empty cells", () => {
    const game = gameFactory()
    placeGrass(game, 5, 5)

    const worker = workerEntityResource.create({
      game,
      item: { position: createVector3(8, 1, 8) },
    })

    expect(findTileUnderEntity(game, worker)).toBeUndefined()
  })

  it("findTileUnderEntity covers the full footprint of a multi-cell building", () => {
    const game = gameFactory()
    placeGrass(game, 3, 3)

    const tower = towerEntityResource.create({
      game,
      item: { position: createVector3(2, 1, 2) },
    })

    expect(findTileUnderEntity(game, tower)).toBe(
      grassGroundEntityMetadata["@id"],
    )
  })

  it("entitiesMatrix marks ground cells as passable until a building covers them", () => {
    const game = gameFactory()
    placeGrass(game, 5, 5)

    expect(game.gameWorld.entitiesMatrix[5]?.[5]).toBeTruthy()

    const tower = towerEntityResource.create({
      game,
      item: { position: createVector3(5, 1, 5) },
    })
    addEntityToGame(game, tower)

    expect(game.gameWorld.entitiesMatrix[5]?.[5]).toBe(0)
  })
})
