import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import iconSrc from "./iconSrc.png"
import model from "./model.png"
import modelTreeCut from "./treeCuted.png"

import { createJsonLdType } from "@/packages/jsonLd/jsonLd"
import { appLdType } from "@/app/AppLdType"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"

export const treeDeathEntityMeta = entityResourceFactory({
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

export const treeEntityMetaData = entityResourceFactory({
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
  ["@type"]: createJsonLdType(appLdType.entityResource, "tree"),
  onDeath: ({ entity, game }) => {
    const deathTree = treeDeathEntityMeta.factory({
      game,
      entity: { position: entity.position },
    })

    addEntityToGame(game, deathTree)
  },
})
