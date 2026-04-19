// import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png?url"
import model from "./model.png"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { EntityState } from "@/packages/game/entity/EntityState"

export const forumEntityResource = createEntityResource({
  ["@id"]: "resource/forum",
  entityType: EntityType.building,
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  workerAction: goBuildOfBuildingActionResource,
  canRecruit: ({ game }) =>
    entityQuery(game, { state: EntityState.under_construction }).length > 0,
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
