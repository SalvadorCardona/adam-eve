import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import roadIcon from "./icon.png"
import roadTexture from "./road.png"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const roadGroundEntityMetadata = createEntityResource({
  ["@id"]: "road",
  entityType: EntityType.ground,
  asset: {
    icon: roadIcon,
    model2d: roadTexture,
  },
  label: "Route",
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
