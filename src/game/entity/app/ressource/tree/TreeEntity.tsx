import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./tree.glb?url"
import iconSrc from "./iconSrc.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const treeEntityMetaData = entityMedataFactory({
  asset: {
    model3d: asset,
    icon: iconSrc,
  },
  propriety: {
    speed: 0.01,
    attack: {
      damage: 1,
      attackRange: 1,
      attackSpeed: 60,
    },
    scale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    health: {
      maxLife: 75,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityRessource, "tree"),
})
