import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./timberHouse.glb?url"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
import { appLdType } from "@/src/AppLdType"

export const timberHouseEntityMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  propriety: {
    work: {
      numberOfWorker: 2,
    },
  },
  workerAction: cutTheWoodActionMetaData,
  label: "Maison de bucheron",
  ["@type"]: appLdType.timberHouse,
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
