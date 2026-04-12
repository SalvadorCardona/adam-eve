import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import model from "./model.png"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"

export const bridgeEntityMetaData = entityMedataFactory({
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "bridge"),
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
    const grounds = entityQuery(game, { "@typeIn": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
})
