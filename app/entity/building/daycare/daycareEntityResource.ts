import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import iconUrl from "./icon.svg?url"
import modelUrl from "./model.svg?url"

const WORKER_SPAWN_INTERVAL = 10000
const SPAWN_OFFSETS: Array<[number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [2, 0],
  [-2, 0],
  [0, 2],
  [0, -2],
]

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

    for (const [dx, dz] of SPAWN_OFFSETS) {
      const position = createVector3(
        entity.position.x + entity.size.x + dx,
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
