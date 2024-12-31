import { Vector3Interface, vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { has2dCollision } from "@/src/utils/3Dmath/has2dCollision"
import { GroundEntityInterface } from "@/src/game/entity/entityGround/GroundEntityInterface"

interface Collision2D {
  position: Vector3Interface
  size: Vector3Interface
}

export function entityHasCollision(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  return has2dCollision(
    vector3ToVector2(entitySource.position),
    vector3ToVector2(entitySource.size),
    vector3ToVector2(entityTarget.position),
    vector3ToVector2(entityTarget.size),
  )
}

function isGroundEntity(entity: EntityInterface): entity is GroundEntityInterface {
  return entity["@type"].startsWith("entity/ground")
}

export function hasCollisionInGame(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const canBeCollision: EntityInterface[] = Object.values(game.entities).filter(
    (e) => e && e !== entity && e.collisionAble,
  )

  for (const otherEntity of canBeCollision) {
    if (!isGroundEntity(otherEntity) && entityHasCollision(entity, otherEntity)) {
      return otherEntity
    }
  }

  return false
}
