import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/app/domain/entity/EntityMedataFactory"

export const characterEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/personnage/character",
  asset: {
    // model3d: "./low_poly_human.glb",
    model2d: "character.png",
  },

  defaultEntity: () => {
    return {
      speed: 0.1,
      life: 50,
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 1,
        y: 0.2,
        z: 1,
      },
      size: {
        x: 0.4,
        y: 0.4,
        z: 0.4,
      },
    }
  },
})
