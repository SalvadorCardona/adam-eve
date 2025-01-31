import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const forumEntityMetaData = entityMedataFactory({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  workerAction: goBuildOfBuildingActionMetadata,
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
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "forum"),
  label: "Centre Ville",
})
