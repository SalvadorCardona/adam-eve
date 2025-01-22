import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { has2dCollision } from "@/src/utils/3Dmath/has2dCollision"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { appLdType } from "@/src/AppLdType"
import { entityToBoundingBox } from "@/src/game/entity/entityToBoundingBox"

export function entityHasCollision(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  return has2dCollision(
    entityToBoundingBox(entitySource),
    entityToBoundingBox(entityTarget),
  )
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
