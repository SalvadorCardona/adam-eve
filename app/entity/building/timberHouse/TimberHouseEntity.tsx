import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png?url"
import model from "./model.png?url"
import { getResourceActionResource } from "@/app/action/getResourceActionResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const timberHouseEntityMetaData = createEntityResource({
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
  workerAction: getResourceActionResource,
  label: "Maison de bucheron",
  entityType: EntityType.building,
  ["@id"]: "timberHouse",
})
