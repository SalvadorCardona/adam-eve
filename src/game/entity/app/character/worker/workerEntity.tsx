import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset2D from "./worker.png"
import iconFarmerSrc from "./iconFarmer.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { createFramePixiJs } from "@/src/UI/graphic-motor/pixiJs/createFramePixiJs"
import attackAnimationSrc from "./animation/attack.png"
import ideAnimationSrc from "./animation/ide.png"
import moveSrc from "./animation/move.png"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { bloodEntityMetaData } from "@/src/game/entity/app/effect/blood/BloodEntity"

const moveAnimation = createFramePixiJs({
  image: moveSrc,
  steps: 8,
  width: 768,
})

const attackAnimation = createFramePixiJs({ image: attackAnimationSrc })

const idleAnimation = createFramePixiJs({
  image: ideAnimationSrc,
  steps: 9,
  width: 864,
})

export const workerEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "worker"),
  label: "Citoyen",
  asset: {
    model2d: asset2D,
    icon: iconFarmerSrc,
    asset2d: [attackAnimationSrc, ideAnimationSrc, moveSrc],
    animationMapper: {
      [EntityState.wait]: idleAnimation,
      [EntityState.move]: moveAnimation,
      [EntityState.go_to_put_ressource]: moveAnimation,
      [EntityState.go_to_tree]: moveAnimation,
      [EntityState.attack]: attackAnimation,
      [EntityState.cut_the_tree]: attackAnimation,
    },
  },
  propriety: {
    inventorySize: 10,
    speed: 1.4,
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
      maxLife: 25,
    },
  },
  onHit: ({ entity, game }) => {
    const deathTree = bloodEntityMetaData.factory({
      game,
      entity: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
