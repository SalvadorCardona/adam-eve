import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./forum.glb?url"
import { goBuildOfBuildingActionMetadata } from "@/src/game/action/app/goBuildOfBuildingActionMetadata"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const forumEntityMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
    // model2d: "house.png",
  },
  workerAction: goBuildOfBuildingActionMetadata,
  propriety: {
    work: {
      numberOfWorker: 2,
    },
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "forum"),
  label: "Centre Ville",
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
      rotation: {
        x: 0,
        y: Math.PI,
        z: 0,
      },
    }
  },
})
