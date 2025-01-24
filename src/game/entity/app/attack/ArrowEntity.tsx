import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { appLdType } from "@/src/AppLdType"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { ArrowAttackActionMetadata } from "@/src/game/entity/app/attack/ArrowAttackActionMetadata"
import model from "./model.png"

export const ArrowEntityMetaData = entityMedataFactory({
  asset: {
    model2d: model,
  },
  propriety: {
    attack: {
      attackRange: 10,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 1.4,
    size: {
      x: 10,
      y: 10,
      z: 10,
    },
    defaultActions: [ArrowAttackActionMetadata["@type"]],
  },
  ["@type"]: JsonLdTypeFactory(appLdType.entityAttack, "Arrow"),
})
