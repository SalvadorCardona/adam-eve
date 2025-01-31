import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import model from "./model.png"

import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const bloodEntityMetaData = entityMedataFactory({
  onFrame: ({ entity }) => {
    entity.life--
  },
  asset: {
    model2d: model,
  },
  propriety: {
    health: {
      maxLife: 200,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityEffect, "blood"),
})
