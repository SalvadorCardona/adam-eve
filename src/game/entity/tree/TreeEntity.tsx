import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"

export const treeEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    // model3d: "low_poly_tree.glb",
    model2d: "three.png",
  },
  ["@type"]: "entity/building/three",
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
