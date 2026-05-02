import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png"
import { findTileUnderEntity } from "@/packages/game/game/useCase/query/groundQuery"
import model from "./bridge.png"
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
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 5 }],
    }),
  },
  canBeBuild: ({ entity, game }) => {
    return findTileUnderEntity(game, entity) === undefined
  },
})
