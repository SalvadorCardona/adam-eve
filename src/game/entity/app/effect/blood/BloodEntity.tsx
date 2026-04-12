import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import model from "./model.png"
import { appLdType } from "@/app/AppLdType"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"

export const bloodEntityMetaData = entityMedataFactory({
  ["@type"]: createJsonLdType(appLdType.entityEffect, "blood"),
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
})
