import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png?url"
import { getRessourceActionMetaData } from "@/src/game/action/app/getRessourceActionMetaData"
import { appLdType } from "@/src/AppLdType"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"

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
  workerAction: getRessourceActionMetaData,
  label: "Timber House",
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "timberHouse"),
})
