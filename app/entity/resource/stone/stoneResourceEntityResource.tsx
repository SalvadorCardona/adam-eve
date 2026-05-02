import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import depositSrc from "./deposit.png"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const stoneResourceEntityResource = createEntityResource({
  ["@id"]: "resource/stone-resource",
  entityType: EntityType.resource,
  label: "Pierre",
  asset: {
    icon: depositSrc,
    model2d: depositSrc,
  },
  propriety: {
    health: {
      maxLife: 100,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
