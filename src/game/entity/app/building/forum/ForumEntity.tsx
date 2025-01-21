import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const forumEntityMetaData = entityMedataFactory({
  asset: {
    icon: imageIcon,
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
      x: 100,
      y: 100,
      z: 100,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "forum"),
  label: "Centre Ville",
})
