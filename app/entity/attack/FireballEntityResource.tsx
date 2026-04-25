import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import fireballSvg from "./fireball.svg?url"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { entityQueryFindOne } from "@/packages/game/game/useCase/query/entityQuery"
import { entityHasCollision } from "@/packages/game/entity/useCase/entityHasCollision"
import { getResource } from "@/packages/resource/ResourceInterface"
import { removeEntityToGame } from "@/packages/game/entity/useCase/removeEntityToGame"
import { vector3MoveToVector } from "@/packages/math/vector3MoveToVector"
import { getEntitySpeed } from "@/packages/game/entity/useCase/query/getEntitySpeed"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"

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
      damage: 60,
      attackSpeed: 0.1,
    },
    speed: 0.15,
    size: {
      x: 0.4,
      y: 0.4,
      z: 0.4,
    },
  },
  onFrame: ({ game, entity }) => {
    if (!entity) return

    const targetIri = entity.entityAttackTargetIri
    if (!targetIri) {
      entity.life = 0
      removeEntityToGame(game, entity)
      return
    }

    const target = entityQueryFindOne(game, { "@id": targetIri })
    if (!target || target.life <= 0) {
      entity.life = 0
      removeEntityToGame(game, entity)
      return
    }

    if (entityHasCollision(entity, target)) {
      const meta = getResource<EntityResourceInterface>(entity)
      const damage = meta?.propriety.attack?.damage ?? 0
      target.life -= damage
      entity.life = 0
      removeEntityToGame(game, entity)
      return
    }

    const move = vector3MoveToVector(
      entity.position,
      target.position,
      getEntitySpeed(entity),
    )
    entity.position.x = move.position.x
    entity.position.y = move.position.y
    entity.position.z = move.position.z
    entity.rotation = move.rotation
    updateEntityInGame(game, entity)
  },
})
