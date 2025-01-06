import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { appLdType } from "@/src/AppLdType"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

export const effectMetaData = entityMedataFactory({
  component: ({ entity }) => {},
  ["@type"]: JsonLdTypeFactory(appLdType.entityEffect, "smoke"),
  defaultEntity: () => {
    return {
      size: {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      },
    }
  },
})
