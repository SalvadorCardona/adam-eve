import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import iconSrc from "@/app/entity/resource/stone/icon.svg?url"
import model from "@/app/entity/resource/stone/model.svg?url"
import { getResourceActionResource } from "@/app/action/getResourceActionResource"

export const stoneMineBuildMetaDataEntity = createEntityResource({
  ["@id"]: "resource/stone-building",
  entityType: EntityType.building,
  label: "Mine de pierre",
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
