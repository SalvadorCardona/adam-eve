import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconSrc from "./iconSrc.png"
import model from "./model.png"
import modelTreeCut from "./treeCuted.png"

import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"

export const treeDeathEntityMeta = entityMedataFactory({
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
  ["@type"]: createJsonLdType(appLdType.entityEffect, "deathTree"),
})

export const treeEntityMetaData = entityMedataFactory({
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
  ["@type"]: createJsonLdType(appLdType.entityRessource, "tree"),
  onDeath: ({ entity, game }) => {
    const deathTree = treeDeathEntityMeta.factory({
      game,
      entity: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
