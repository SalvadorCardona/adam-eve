import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { arrowAttackActionResource } from "@/app/entity/attack/arrowAttackActionResource"
import model from "./model.png"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const arrowEntityResource = createEntityResource({
  ["@id"]: "resource/arrow",
  entityType: EntityType.attack,
  asset: {
    model2d: model,
  },
  propriety: {
    attack: {
      attackRange: 0.5,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 0.02,
    size: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
    defaultActions: [arrowAttackActionResource["@id"]],
  },
})
