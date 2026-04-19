import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import roadIcon from "./icon.svg?url"
import roadTexture from "./road.svg?url"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { appLdType } from "@/app/AppLdType"

export const roadGroundEntityMetadata = createEntityResource({
  ["@id"]: "entity/ground/road",
  entityType: EntityType.ground,
  asset: {
    icon: roadIcon,
    model2d: roadTexture,
  },
  ["@type"]: appLdType.entityGround + "/road",
  label: "Route",
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
