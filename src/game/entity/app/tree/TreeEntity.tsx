import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./tree.glb?url"
import iconSrc from "./iconSrc.png"

export const treeEntityMetaData = entityMedataFactory({
  asset: {
    model3d: asset,
    icon: iconSrc,
  },
  ["@type"]: "entity/nature/tree",
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
