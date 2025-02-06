import imageIcon from "./icon.png?url"
import model from "./model.png"

import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"

export const houseEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  propriety: {
    ressourceForConstruction: createInventory({
      items: [{ inventoryItem: woodRessourceMetadata, quantity: 5 }],
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
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "house"),
  label: "Maison",
})
