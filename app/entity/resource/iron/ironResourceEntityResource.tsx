import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import depositSrc from "./deposit.png"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const ironResourceEntityResource = createEntityResource({
  ["@id"]: "resource/iron-resource",
  entityType: EntityType.resource,
  label: "Fer",
  asset: {
    icon: depositSrc,
    model2d: depositSrc,
  },
  propriety: {
    health: {
      maxLife: 125,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
