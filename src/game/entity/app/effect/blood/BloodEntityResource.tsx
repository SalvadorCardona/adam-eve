import { entityResourceFactory } from "@/src/game/entity/EntityResourceFactory"
import { EntityType } from "@/src/game/entity/EntityResourceInterface"
import model from "@/src/game/entity/app/effect/blood/model.png"

export const bloodEntityResource = entityResourceFactory({
  ["@id"]: "blood",
  entityType: EntityType.effect,
  onFrame: ({ entity }) => {
    entity.life--
  },
  asset: {
    model2d: model,
  },
  propriety: {
    health: {
      maxLife: 200,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
  },
})
