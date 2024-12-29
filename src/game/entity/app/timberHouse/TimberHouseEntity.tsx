import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./timberHouse.glb?url"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"

export const timberHouseEntityMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  propriety: {
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 5,
      }),
    },
  },
  workerAction: cutTheWoodActionMetaData,
  label: "Maison de bucheron",
  ["@type"]: "entity/building/timberHouse",
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
