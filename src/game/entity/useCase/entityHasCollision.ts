import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { boundingCollision } from "@/src/utils/math/boundingCollision"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { appLdType } from "@/src/AppLdType"
import { entityToBoundingBox } from "@/src/game/entity/transformer/entityToBoundingBox"

export function entityHasCollision(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  return boundingCollision(
    entityToBoundingBox(entitySource),
    entityToBoundingBox(entityTarget),
  )
}

export function hasCollisionInGame(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const canBeCollision: EntityInterface[] = entityQuery(game, {
    "@idIsNot": entity["@id"],
  })

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
  const grounds = entityQuery(game, { "@typeIn": appLdType.entityGround })

  for (const ground of grounds) {
    if (entityHasCollision(entity, ground)) {
      return ground
    }
  }

  return false
}
