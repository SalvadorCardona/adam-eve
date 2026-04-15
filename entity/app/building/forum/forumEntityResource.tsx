import { entityResourceFactory } from "@/packages/game/entity/EntityResourceFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const forumEntityResource = entityResourceFactory({
  ["@id"]: "resource/forum",
  entityType: EntityType.building,
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  workerAction: goBuildOfBuildingActionResource,
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 200,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
  label: "Centre Ville",
})
