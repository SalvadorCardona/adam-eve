import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import goldMineSrc from "./goldMine.png"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"

export const goldResourceEntityResource = entityResourceFactory({
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
