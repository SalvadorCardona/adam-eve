import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import imageIcon from "./icon.png?url"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import model from "./model.png"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"

export const BridgeEntityResource = entityResourceFactory({
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
