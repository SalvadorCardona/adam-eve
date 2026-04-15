import { entityResourceFactory } from "@/packages/game/entity/EntityResourceFactory"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import iconSrc from "@/entity/app/resource/gold/goldMineBuildIcon.png"
import model from "@/entity/app/resource/gold/model.png"
import { getResourceActionMetaData } from "@/app/action/getResourceActionMetaData"

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
