import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconFarmerSrc from "./img.png"
import zombieUrl from "./zombie.png"

import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { ZombieAttackActionMetadata } from "@/src/game/entity/app/character/zombie/zombieAttackActionMetadata"
import { EntityState } from "@/src/game/entity/EntityState"
import { EntityFaction } from "@/src/game/entity/EntityInterface"
import { createFramePixiJs } from "@/src/UI/graphic-motor/pixiJs/createFramePixiJs"
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

export const zombieEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "zombie"),
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
    speed: 1,
    attack: {
      damage: 1,
      attackRange: 20,
      attackSpeed: 60,
    },
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
    health: {
      maxLife: 100,
    },
    defaultActions: [ZombieAttackActionMetadata["@type"]],
  },
  defaultEntity: () => ({ faction: EntityFaction.enemy }),
})
