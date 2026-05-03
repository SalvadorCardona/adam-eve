import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import asset2D from "./worker.png"
import iconFarmerSrc from "./iconFarmer.png"
import { EntityState } from "@/packages/game/entity/EntityState"
import { createFramePixiJs } from "@/packages/ui/graphic-motor/pixiJs/createFramePixiJs"
import attackAnimationSrc from "./animation/attack.png"
import ideAnimationSrc from "./animation/ide.png"
import moveSrc from "./animation/move.png"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { bloodEntityResource } from "@/app/entity/effect/blood/BloodEntityResource"

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

export const workerEntityResource = createEntityResource({
  ["@id"]: "resource/worker",
  entityType: EntityType.character,
  label: "Citoyen",
  asset: {
    model2d: asset2D,
    icon: iconFarmerSrc,
    asset2d: [attackAnimationSrc, ideAnimationSrc, moveSrc],
    animationMapper: {
      [EntityState.wait]: idleAnimation,
      [EntityState.move]: moveAnimation,
      [EntityState.go_to_put_resource]: moveAnimation,
      [EntityState.go_to_resource]: moveAnimation,
      [EntityState.attack]: attackAnimation,
      [EntityState.cut_the_tree]: attackAnimation,
      [EntityState.build]: attackAnimation,
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
    vision: {
      range: 4,
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
    const resource = bloodEntityResource

    const deathTree = resource.create({
      game,
      item: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
