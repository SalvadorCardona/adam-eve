import imageSource from "./house.glb?url"
import imageIcon from "./icon.png?url"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const houseEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model3d: imageSource,
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
      x: 2,
      y: 2,
      z: 2,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "house"),
  label: "Maison",
})
