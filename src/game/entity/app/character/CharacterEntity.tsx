import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./robot.glb?url"

export const characterEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/personnage/character",
  asset: {
    model3d: asset,
  },
  defaultEntity: () => {
    return {
      speed: 0.1,
      life: 50,
      scale: {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      },
      position: {
        x: 1,
        y: 0.2,
        z: 1,
      },
      size: {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
    }
  },
})
