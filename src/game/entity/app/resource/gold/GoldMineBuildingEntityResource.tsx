import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"
import iconSrc from "@/src/game/entity/app/resource/gold/goldMineBuildIcon.png"
import model from "@/src/game/entity/app/resource/gold/model.png"
import { getResourceActionMetaData } from "@/src/game/action/app/getResourceActionMetaData"

export const goldMineBuildMetaDataEntity = entityResourceFactory({
  ["@id"]: "resource/gold-building",
  entityType: EntityType.building,
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
  workerAction: getResourceActionMetaData,
})
