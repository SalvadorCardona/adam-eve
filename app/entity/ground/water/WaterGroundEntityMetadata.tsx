import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { findTileUnderEntity } from "@/packages/game/game/useCase/query/groundQuery"
import waterTexture from "./water.png"

export const waterGroundEntityMetadata = createEntityResource({
  ["@id"]: "water-ground",
  entityType: EntityType.ground,
  asset: {
    icon: waterTexture,
    model2d: waterTexture,
  },
  propriety: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  walkable: false,
  label: "Eau",
  canBeBuild: ({ entity, game }) => {
    return findTileUnderEntity(game, entity) === undefined
  },
})
