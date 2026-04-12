import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png?url"
import { getResourceActionMetaData } from "@/src/game/action/app/getResourceActionMetaData"
import { appLdType } from "@/app/AppLdType"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"

export const timberHouseEntityMetaData = entityMedataFactory({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
  workerAction: getResourceActionMetaData,
  label: "Timber House",
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "timberHouse"),
})
