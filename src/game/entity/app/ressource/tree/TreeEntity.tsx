import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconSrc from "./iconSrc.png"
import model from "./model.png"

import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const treeEntityMetaData = entityMedataFactory({
  asset: {
    icon: iconSrc,
    model2d: model,
  },
  propriety: {
    speed: 0.01,
    health: {
      maxLife: 75,
    },
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityRessource, "tree"),
})
