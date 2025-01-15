import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const houseEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    icon: imageIcon,
  },
  propriety: {
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 10,
      }),
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 100,
      y: 100,
      z: 100,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "house"),
  label: "Maison",
})
