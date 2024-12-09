import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/app/domain/entity/EntityMedataFactory"

export const characterEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/personnage/character",
  asset: {
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
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
    }
  },
})
