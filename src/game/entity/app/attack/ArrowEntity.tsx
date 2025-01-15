import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import { appLdType } from "@/src/AppLdType"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { ArrowAttackActionMetadata } from "@/src/game/entity/app/attack/ArrowAttackActionMetadata"

export const ArrowMetaData = entityMedataFactory({
  propriety: {
    attack: {
      attackRange: 10,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 0.05,
    size: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    defaultActions: [ArrowAttackActionMetadata["@type"]],
  },
  label: "Tour de défense",
  ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "Arrow"),
})
