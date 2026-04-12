import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"

export const portEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
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
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "port"),
})
