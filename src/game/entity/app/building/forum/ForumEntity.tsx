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
  ["@type"]: JsonLdTypeFactory(appLdType.entityBuilding, "forum"),
  label: "Centre Ville",
  defaultEntity: () => {
    return {
      numberOfWorker: 2,
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    }
  },
})
