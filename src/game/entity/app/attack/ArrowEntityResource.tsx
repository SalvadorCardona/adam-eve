import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import { arrowAttackActionResource } from "@/src/game/entity/app/attack/arrowAttackActionResource"
import model from "./model.png"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"

export const arrowEntityResource = entityResourceFactory({
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
