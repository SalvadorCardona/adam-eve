import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import iconUrl from "./icon.svg?url"
import modelUrl from "./model.svg?url"

const WORKER_SPAWN_INTERVAL = 1000
const MAX_SPAWN_RADIUS = 6

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

export const daycareEntityResource = createEntityResource({
  ["@id"]: "daycare",
  label: "Crèche",
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
  },
  onFrame: ({ entity, game }) => {
    if (game.time === 0) return
    if (game.time % WORKER_SPAWN_INTERVAL !== 0) return

    for (const [dx, dz] of ringOffsets(MAX_SPAWN_RADIUS)) {
      const position = createVector3(
        entity.position.x + dx,
        1,
        entity.position.z + dz,
      )

      const newWorker = workerEntityResource.create({
        game,
        item: { position },
      })

      if (workerEntityResource.canBeBuild?.({ entity: newWorker, game })) {
        addEntityToGame(game, newWorker)
        return
      }
    }
  },
})
