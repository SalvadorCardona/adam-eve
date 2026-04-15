import imageIcon from "./icon.png?url"
import { entityResourceFactory } from "@/packages/game/entity/EntityResourceFactory"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/entity/app/resource/tree/woodResource"

export const storageEntityResource: EntityResourceInterface = entityResourceFactory({
  ["@id"]: "resource/storage",
  entityType: EntityType.building,
  asset: {
    icon: imageIcon,
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
      items: [{ inventoryItem: woodResourceMetadata, quantity: 5 }],
    }),
  },
})
