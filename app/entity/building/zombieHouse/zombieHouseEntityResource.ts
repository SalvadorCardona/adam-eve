import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { zombieEntityResource } from "@/app/entity/character/zombie/zombieEntityResource"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import EntityInterface, { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { JsonLdIri } from "@/packages/jsonLd/jsonLd"
import iconUrl from "./icon.svg?url"
import modelUrl from "./model.svg?url"

const ZOMBIE_SPAWN_INTERVAL = 1000
const MAX_SPAWN_RADIUS = 6
const MAX_ALIVE_ZOMBIES = 6

interface ZombieHouseEntity extends EntityInterface {
  spawnedZombieIds?: JsonLdIri[]
}

function* ringOffsets(maxRadius: number): Generator<[number, number], void, void> {
  for (let radius = 1; radius <= maxRadius; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dz = -radius; dz <= radius; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== radius) continue
        yield [dx, dz]
      }
    }
  }
}

export const zombieHouseEntityResource = createEntityResource({
  ["@id"]: "zombieHouse",
  label: "Maison de Zombie",
  entityType: EntityType.building,
  asset: {
    icon: iconUrl,
    model2d: modelUrl,
  },
  propriety: {
    health: { maxLife: 120 },
    size: { x: 2, y: 2, z: 2 },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 8 }],
    }),
    constructionTime: 400,
  },
  defaultEntity: () => ({ faction: EntityFaction.enemy }),
  onFrame: ({ entity, game }) => {
    const house = entity as ZombieHouseEntity
    house.spawnedZombieIds = (house.spawnedZombieIds ?? []).filter(
      (id) => game.entities[id] !== undefined,
    )

    if (game.time === 0) return
    if (game.time % ZOMBIE_SPAWN_INTERVAL !== 0) return
    if (house.spawnedZombieIds.length >= MAX_ALIVE_ZOMBIES) return

    for (const [dx, dz] of ringOffsets(MAX_SPAWN_RADIUS)) {
      const position = createVector3(
        entity.position.x + dx,
        1,
        entity.position.z + dz,
      )

      const newZombie = zombieEntityResource.create({
        game,
        item: { position },
      })

      if (zombieEntityResource.canBeBuild?.({ entity: newZombie, game })) {
        addEntityToGame(game, newZombie)
        house.spawnedZombieIds.push(newZombie["@id"])
        return
      }
    }
  },
})
