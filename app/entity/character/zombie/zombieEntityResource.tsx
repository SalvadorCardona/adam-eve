import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import iconFarmerSrc from "./img.png"
import zombieUrl from "./zombie.png"
import { zombieAttackActionResource } from "@/app/entity/character/zombie/zombieAttackActionResource"
import { EntityState } from "@/packages/game/entity/EntityState"
import { EntityFaction } from "@/packages/game/entity/EntityInterface"
import { createFramePixiJs } from "@/packages/ui/graphic-motor/pixiJs/createFramePixiJs"
import attackAnimationSrc from "./animation/attack.png"
import ideAnimationSrc from "./animation/idle.png"
import moveSrc from "./animation/move.png"

const moveAnimation = createFramePixiJs({
  image: moveSrc,
  steps: 8,
  width: 768,
})

const attackAnimation = createFramePixiJs({
  image: attackAnimationSrc,
  width: 864,
  steps: 9,
})

const idleAnimation = createFramePixiJs({
  image: ideAnimationSrc,
  steps: 8,
  width: 768,
})

export const zombieEntityResource: EntityResourceInterface = createEntityResource({
  ["@id"]: "resource/zombie",
  entityType: EntityType.character,
  label: "Zombie",
  asset: {
    model2d: zombieUrl,
    icon: iconFarmerSrc,
    asset2d: [moveSrc, attackAnimationSrc, ideAnimationSrc],
    animationMapper: {
      [EntityState.move]: moveAnimation,
      [EntityState.go_to_enemy]: moveAnimation,
      [EntityState.wait]: idleAnimation,
      [EntityState.attack]: attackAnimation,
      [EntityState.find_enemy]: idleAnimation,
    },
  },
  propriety: {
    speed: 0.02,
    attack: {
      damage: 1,
      attackRange: 0.5,
      attackSpeed: 60,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    health: {
      maxLife: 100,
    },
    defaultActions: [zombieAttackActionResource["@id"]!],
  },
  defaultEntity: () => ({ faction: EntityFaction.enemy }),
})
