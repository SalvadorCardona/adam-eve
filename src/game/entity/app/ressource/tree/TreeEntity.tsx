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
  ["@type"]: JsonLdTypeFactory(appLdType.entityRessource, "storage"),
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    }
  },
})
