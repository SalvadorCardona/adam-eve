import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { fireballAttackActionResource } from "@/app/entity/attack/fireballAttackActionResource"
import fireballSvg from "./fireball.svg?url"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const fireballEntityResource = createEntityResource({
  ["@id"]: "resource/fireball",
  entityType: EntityType.attack,
  label: "Boule de feu",
  asset: {
    model2d: fireballSvg,
    icon: fireballSvg,
  },
  propriety: {
    attack: {
      attackRange: 0.5,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 0.03,
    size: {
      x: 0.4,
      y: 0.4,
      z: 0.4,
    },
    defaultActions: [fireballAttackActionResource["@id"]],
  },
})
