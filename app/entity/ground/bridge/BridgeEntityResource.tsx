import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.svg?url"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import model from "./bridge.svg?url"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const BridgeEntityResource = createEntityResource({
  ["@id"]: "resource/bridge",
  entityType: EntityType.building,
  label: "Pont",
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  propriety: {
    health: {
      maxLife: 100,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata, quantity: 5 }],
    }),
  },
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@typeIn": EntityType.ground })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
})
