import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconSrc from "./goldMineBuildIcon.png"
import model from "./model.png"
import goldMineSrc from "./goldMine.png"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { getRessourceActionMetaData } from "@/src/game/action/app/getRessourceActionMetaData"

export const goldMineBuildMetaDataEntity = entityMedataFactory({
  asset: {
    icon: iconSrc,
    model2d: model,
  },
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 75,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
  workerAction: getRessourceActionMetaData,
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "gold"),
})

export const goldMineRessourceMetaDataEntity = entityMedataFactory({
  asset: {
    icon: goldMineSrc,
    model2d: goldMineSrc,
  },
  propriety: {
    health: {
      maxLife: 75,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  ["@type"]: createJsonLdType(appLdType.entityRessource, "gold"),
})
