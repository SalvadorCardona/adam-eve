import iconUrl from "./icon.png"
import modelUrl from "./model.png"
import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const storageEntityResource: EntityResourceInterface = createEntityResource({
  ["@id"]: "resource/storage",
  label: "Entrepôt",
  entityType: EntityType.building,
  asset: {
    icon: iconUrl,
    model2d: modelUrl,
  },
  propriety: {
    health: {
      maxLife: 100,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 5 }],
    }),
    constructionTime: 300,
  },
})
