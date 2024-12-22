import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./tree.glb?url"

export const treeEntityMetaData = entityMedataFactory({
  asset: {
    model3d: asset,
    // model2d: "three.png",
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
      scale: {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
    }
  },
})
