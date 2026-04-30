import GameInterface from "@/packages/game/game/GameInterface"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import { hasTileAtCell } from "@/packages/game/game/useCase/query/groundQuery"
import { grassGroundEntityMetadata } from "@/app/entity/ground/grass/GrassGroundEntityMetadata"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { goldResourceEntityResource } from "@/app/entity/resource/gold/goldResourceEntityResource"
import { zombieHouseEntityResource } from "@/app/entity/building/zombieHouse/zombieHouseEntityResource"
import { EntityState } from "@/packages/game/entity/EntityState"

interface ClusterDef {
  entityCount: [number, number]
  spawnRadius: number
  groundRadius: number
  groundDensity: number
}

export const PROCEDURAL_SPAWN_PROBABILITY = {
  forest: 0.025,
  gold: 0.008,
  zombieCamp: 0.003,
  groundPatch: 0.06,
} as const

type BiomeKey = keyof typeof PROCEDURAL_SPAWN_PROBABILITY

export const PROCEDURAL_CLUSTER: Record<BiomeKey, ClusterDef> = {
  forest: { entityCount: [4, 9], spawnRadius: 3, groundRadius: 3, groundDensity: 0.85 },
  gold: { entityCount: [2, 5], spawnRadius: 2, groundRadius: 2, groundDensity: 0.85 },
  zombieCamp: { entityCount: [1, 2], spawnRadius: 3, groundRadius: 4, groundDensity: 0.85 },
  groundPatch: { entityCount: [0, 0], spawnRadius: 0, groundRadius: 3, groundDensity: 0.7 },
}

function hasGroundAt(game: GameInterface, x: number, z: number): boolean {
  return hasTileAtCell(game, { x, y: z })
}

function spawnGroundAt(game: GameInterface, x: number, z: number): void {
  if (hasGroundAt(game, x, z)) return
  const grass = grassGroundEntityMetadata.create({
    game,
    item: { position: createVector3(x, 0, z) },
  })
  if (!grassGroundEntityMetadata.canBeBuild?.({ entity: grass, game })) return
  addEntityToGame(game, grass)
}

function trySpawnEntity(
  game: GameInterface,
  resource: {
    create: (payload: any) => any
    canBeBuild?: (payload: any) => boolean
  },
  x: number,
  z: number,
  asBuilding = false,
): boolean {
  const entity = resource.create({
    game,
    item: { position: createVector3(x, 1, z) },
  })
  if (resource.canBeBuild && !resource.canBeBuild({ entity, game })) return false
  if (asBuilding) entity.state = EntityState.builded
  addEntityToGame(game, entity)
  return true
}

function spawnGroundBlob(
  game: GameInterface,
  cx: number,
  cz: number,
  radius: number,
  density: number,
): void {
  const r2 = radius * radius
  for (let dz = -radius; dz <= radius; dz++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx * dx + dz * dz > r2) continue
      if (!(dx === 0 && dz === 0) && Math.random() > density) continue
      spawnGroundAt(game, cx + dx, cz + dz)
    }
  }
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function spawnCluster(
  game: GameInterface,
  resource: {
    create: (payload: any) => any
    canBeBuild?: (payload: any) => boolean
  },
  cx: number,
  cz: number,
  cluster: ClusterDef,
  asBuilding = false,
): void {
  spawnGroundBlob(game, cx, cz, cluster.groundRadius, cluster.groundDensity)
  const count = randInt(cluster.entityCount[0], cluster.entityCount[1])
  if (count === 0) return
  const attempts = count * 4
  let placed = 0
  for (let i = 0; i < attempts && placed < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const r = Math.random() * cluster.spawnRadius
    const x = Math.round(cx + Math.cos(angle) * r)
    const z = Math.round(cz + Math.sin(angle) * r)
    if (trySpawnEntity(game, resource, x, z, asBuilding)) placed++
  }
}

export function proceduralSpawnOnCell(
  game: GameInterface,
  x: number,
  z: number,
): void {
  if (hasGroundAt(game, x, z)) return

  const roll = Math.random()
  let acc = PROCEDURAL_SPAWN_PROBABILITY.zombieCamp
  if (roll < acc) {
    spawnCluster(game, zombieHouseEntityResource, x, z, PROCEDURAL_CLUSTER.zombieCamp, true)
    return
  }
  acc += PROCEDURAL_SPAWN_PROBABILITY.gold
  if (roll < acc) {
    spawnCluster(game, goldResourceEntityResource, x, z, PROCEDURAL_CLUSTER.gold)
    return
  }
  acc += PROCEDURAL_SPAWN_PROBABILITY.forest
  if (roll < acc) {
    spawnCluster(game, treeEntityMetaData, x, z, PROCEDURAL_CLUSTER.forest)
    return
  }
  acc += PROCEDURAL_SPAWN_PROBABILITY.groundPatch
  if (roll < acc) {
    spawnGroundBlob(
      game,
      x,
      z,
      PROCEDURAL_CLUSTER.groundPatch.groundRadius,
      PROCEDURAL_CLUSTER.groundPatch.groundDensity,
    )
  }
}

export function proceduralSpawnOnCells(
  game: GameInterface,
  cells: Array<[number, number]>,
): void {
  for (const [x, z] of cells) {
    proceduralSpawnOnCell(game, x, z)
  }
}
