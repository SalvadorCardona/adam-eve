import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import imageSource from "./houseimg.png"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"

export const houseEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  asset: {
    model2d: imageSource.src,
  },
  ["@type"]: "entity/building/house",
  defaultEntity: () => {
    return {
      speed: 0.1,
      life: 50,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    }
  },
})
