import EntityInterface, {
  isCharacterEntity,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { boundingCollision } from "@/packages/math/boundingCollision"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

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
  const sourceIsCharacter = isCharacterEntity(entity)

  const canBeCollision: EntityInterface[] = entityQuery(game, {
    "@idIsNot": entity["@id"],
  })

  for (const otherEntity of canBeCollision) {
    if (isGroundEntity(otherEntity)) continue
    if (sourceIsCharacter && isCharacterEntity(otherEntity)) continue
    if (entityHasCollision(entity, otherEntity)) {
      return otherEntity
    }
  }

  return false
}

export function hasCollisionWithGround(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const grounds = entityQuery(game, { entityType: EntityType.ground })
  for (const ground of grounds) {
    if (entityHasCollision(entity, ground)) {
      return ground
    }
  }

  return false
}
