import imageIcon from "./icon.png?url"
import model from "./model.png"

import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const houseEntityMetaData: EntityResourceInterface = createEntityResource({
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
