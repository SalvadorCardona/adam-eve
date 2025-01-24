import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import model from "./model.png"
import { EntityState } from "@/src/game/entity/EntityState"

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
      x: 50,
      y: 50,
      z: 50,
    },
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 10,
      }),
    },
  },
  canBeBuild: ({ entity, game }) => {
    const grounds = entityQuery(game, { "@type": appLdType.entityGround })
    for (const ground of grounds) {
      if (entityHasCollision(entity, ground)) {
        return false
      }
    }

    return true
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityGround, "bridge"),
  label: "Pont",
  defaultEntity: () => {
    return {
      state: EntityState.under_construction,
    }
  },
})
