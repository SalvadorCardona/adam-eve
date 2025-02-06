import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset2D from "./worker.png"
import iconFarmerSrc from "./iconFarmer.png"
import { EntityState } from "@/src/game/entity/EntityState"
import { createFramePixiJs } from "@/src/UI/graphic-motor/pixiJs/createFramePixiJs"
import attackAnimationSrc from "./animation/attack.png"
import ideAnimationSrc from "./animation/ide.png"
import moveSrc from "./animation/move.png"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { workerEntityMetaDataType } from "@/src/game/entity/app/character/worker/workerEntityMetaDataType"
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

export const workerEntityMetaData = entityMedataFactory({
  ["@type"]: workerEntityMetaDataType,
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
      maxLife: 25,
    },
  },
  onHit: ({ entity, game }) => {
    const metaData = bloodEntityMetaData

    const deathTree = metaData.factory({
      game,
      entity: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
