import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"

export const forumEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model3d: "./forum.glb",
    // model2d: "house.png",
  },
  ["@type"]: "entity/building/forum",
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
      scale: {
        x: 1,
        z: 1,
        y: 1,
      },
    }
  },
})
