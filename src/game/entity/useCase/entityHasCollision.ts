import { Vector3Interface, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { has2dCollision } from "@/src/utils/3Dmath/has2dCollision"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { appLdType } from "@/src/AppLdType"

interface Collision2D {
  position: Vector3Interface
  size: Vector3Interface
}

export function entityHasCollision(
  entitySource: Collision2D,
  entityTarget: Collision2D,
): boolean {
  return has2dCollision(
    vector3ToVector2(entitySource.position),
    vector3ToVector2(entitySource.size),
    vector3ToVector2(entityTarget.position),
    vector3ToVector2(entityTarget.size),
  )
}

function isGroundEntity(entity: EntityInterface) {
  return entity["@type"].startsWith("entity/ground")
}

export function hasCollisionInGame(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const canBeCollision: EntityInterface[] = Object.values(game.entities).filter(
    (e) => e && e !== entity,
  )

  for (const otherEntity of canBeCollision) {
    if (!isGroundEntity(otherEntity) && entityHasCollision(entity, otherEntity)) {
      return otherEntity
    }
  }

  return false
}

export function hasCollisionWithGround(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const grounds = entityQuery(game, { "@type": appLdType.entityGround })

  for (const ground of grounds) {
    if (entityHasCollision(entity, ground)) {
      return ground
    }
  }

  return false
}
