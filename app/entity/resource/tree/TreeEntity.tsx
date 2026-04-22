import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import iconSrc from "./iconSrc.png"
import model from "./model.png"
import modelTreeCut from "./treeCuted.png"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const treeDeathEntityMeta = createEntityResource({
  onFrame: ({ entity }) => {
    entity.life--
  },
  asset: {
    icon: modelTreeCut,
    model2d: modelTreeCut,
  },
  propriety: {
    health: {
      maxLife: 200,
    },
    size: {
      x: 0.2,
      y: 0.2,
      z: 0.2,
    },
  },
  entityType: EntityType.effect,
  ["@id"]: "tree-death",
})

export const treeEntityMetaData = createEntityResource({
  entityType: EntityType.resource,
  label: "Arbre",
  asset: {
    icon: iconSrc,
    model2d: model,
  },
  propriety: {
    speed: 0.01,
    health: {
      maxLife: 75,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  ["@id"]: "tree",
  onDeath: ({ entity, game }) => {
    const deathTree = treeDeathEntityMeta.create({
      game,
      item: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
