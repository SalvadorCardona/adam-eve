import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./forum.glb?url"

export const forumEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
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
