import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
import { appLdType } from "@/src/AppLdType"

export const timberHouseEntityMetaData = entityMedataFactory({
  asset: {
    icon: imageIcon,
  },
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 100,
      y: 100,
      z: 100,
    },
  },
  workerAction: cutTheWoodActionMetaData,
  label: "Maison de bucheron",
  ["@type"]: appLdType.timberHouseEntity,
  defaultEntity: () => {
    return {
      rotation: {
        x: 0,
        y: Math.PI,
        z: 0,
      },
    }
  },
})
