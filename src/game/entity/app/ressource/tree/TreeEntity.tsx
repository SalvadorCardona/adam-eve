import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconSrc from "./iconSrc.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import wood1 from "./assets/tree.glb?url"
import wood3 from "./assets/tree-autumn.glb?url"
import wood2 from "./assets/tree-tall.glb?url"

export const treeEntityMetaData = entityMedataFactory({
  asset: {
    icon: iconSrc,
    multiModel3d: [wood1, wood2, wood3],
  },
  propriety: {
    speed: 0.01,
    attack: {
      damage: 1,
      attackRange: 1,
      attackSpeed: 60,
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
