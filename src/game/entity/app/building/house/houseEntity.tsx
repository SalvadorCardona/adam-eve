import imageIcon from "./icon.png?url"
import model from "./model.png"

import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"

export const houseEntityMetaData: EntityResourceInterface = entityResourceFactory({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  propriety: {
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata, quantity: 5 }],
    }),
    health: {
      maxLife: 100,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
  ["@id"]: createJsonLdType(appLdType.entityBuilding, "house"),
  label: "Maison",
})
