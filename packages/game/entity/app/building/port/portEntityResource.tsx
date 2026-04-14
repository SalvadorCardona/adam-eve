import imageIcon from "./icon.png?url"
import { entityResourceFactory } from "@/packages/game/entity/EntityResourceFactory"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/packages/game/entity/app/resource/tree/woodResource"

export const portEntityResource = entityResourceFactory({
  ["@id"]: "resource/port",
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
