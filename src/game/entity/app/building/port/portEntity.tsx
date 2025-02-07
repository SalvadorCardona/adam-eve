import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodRessourceMetadata } from "@/src/game/entity/app/ressource/tree/woodRessource"

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
    ressourceForConstruction: createInventory({
      items: [{ inventoryItem: woodRessourceMetadata, quantity: 5 }],
    }),
  },
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "port"),
})
