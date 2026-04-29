import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import iconSrc from "@/app/entity/resource/gold/icon.svg?url"
import model from "@/app/entity/resource/gold/model.svg?url"
import { getResourceActionResource } from "@/app/action/getResourceActionResource"

export const goldMineBuildMetaDataEntity = createEntityResource({
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
  workerAction: getResourceActionResource,
})
