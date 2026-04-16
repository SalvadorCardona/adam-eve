import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import goldMineSrc from "./goldMine.png"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const goldResourceEntityResource = createEntityResource({
  ["@id"]: "resource/gold-resource",
  entityType: EntityType.resource,
  asset: {
    icon: goldMineSrc,
    model2d: goldMineSrc,
  },
  propriety: {
    health: {
      maxLife: 75,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})
