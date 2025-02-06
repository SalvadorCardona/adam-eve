import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png?url"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
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
  workerAction: cutTheWoodActionMetaData,
  label: "Maison de bucheron",
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "timberHouse"),
})
