import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { appLdType } from "@/src/AppLdType"
import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { arrowAttackActionMetadata } from "@/src/game/entity/app/attack/ArrowAttackActionMetadata"
import model from "./model.png"

export const ArrowEntityMetaData = entityMedataFactory({
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
    defaultActions: [arrowAttackActionMetadata["@type"]],
  },
  ["@type"]: createJsonLdType(appLdType.entityAttack, "Arrow"),
})
