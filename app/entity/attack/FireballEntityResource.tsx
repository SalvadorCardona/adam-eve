import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import fireballSvg from "./fireball.svg?url"
import { EntityResourceInterface, EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { entityGoToEntity } from "@/packages/game/entity/useCase/move/entityGoToEntity"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import { getResource } from "@/packages/resource/ResourceInterface"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"

export const fireballEntityResource = createEntityResource({
  ["@id"]: "resource/fireball",
  entityType: EntityType.attack,
  label: "Boule de feu",
  asset: {
    model2d: fireballSvg,
    icon: fireballSvg,
  },
  propriety: {
    attack: {
      attackRange: 0.5,
      damage: 20,
      attackSpeed: 0.1,
    },
    speed: 0.01,
    size: {
      x: 0.4,
      y: 0.4,
      z: 0.4,
    },
  },
  onFrame: ({ game, entity }) => {
    if (!entity) {
      return
    }

    if (!entity.entityAttackTargetIri) {
      entity.life = 0
      return
    }

    const target = entityQueryFindOne(game, {
      "@id": entity.entityAttackTargetIri,
    })

    if (!target || target.life <= 0) {
      entity.life = 0
      return
    }

    entityGoToEntity({
      entity: entity,
      target,
    })

    if (entityHasCollision(entity, target)) {
      const meta = getResource<EntityResourceInterface>(entity)
      const damage = meta?.propriety.attack?.damage ?? 0
      target.life -= damage
      entity.life = 0
      removeEntityToGame(game, entity)
    }
  },
})
