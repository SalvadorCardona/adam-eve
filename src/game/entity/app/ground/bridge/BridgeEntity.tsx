import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import model from "./model.png"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodRessourceMetadata } from "@/src/game/entity/app/ressource/tree/woodRessource"

export const bridgeEntityMetaData = entityMedataFactory({
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
    ressourceForConstruction: createInventory({
      items: [{ inventoryItem: woodRessourceMetadata, quantity: 5 }],
    }),
  },
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@typeIn": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "bridge"),
  label: "Pont",
})
