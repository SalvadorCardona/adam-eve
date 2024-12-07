import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/app/domain/entity/EntityMedataFactory"

export const forumEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    // model3d: "./forum.glb",
    model2d: "house.png",
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
    }
  },
})
