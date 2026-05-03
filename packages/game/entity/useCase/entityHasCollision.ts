import EntityInterface, {
  isCharacterEntity,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { boundingCollision } from "@/packages/math/boundingCollision"
import { circleCandidates } from "@/packages/game/game/useCase/query/spatialIndex"
import { findTileUnderEntity } from "@/packages/game/game/useCase/query/groundQuery"
import { entityToBoundingBox } from "@/packages/game/entity/transformer/entityToBoundingBox"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { getResource } from "@/packages/resource/ResourceInterface"

const COLLISION_SEARCH_MARGIN = 5

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
  const sizeX = entity.size?.x ?? 1
  const sizeZ = entity.size?.z ?? 1
  const center = {
    x: entity.position.x + sizeX / 2,
    y: entity.position.z + sizeZ / 2,
  }
  const radius = Math.max(sizeX, sizeZ) / 2 + COLLISION_SEARCH_MARGIN
  const candidates = circleCandidates(game, center, radius)
  const sourceId = entity["@id"]

  for (const otherEntity of candidates) {
    if (otherEntity["@id"] === sourceId) continue
    if (isGroundEntity(otherEntity)) continue
    if (
      otherEntity.entityType === EntityType.effect ||
      otherEntity.entityType === EntityType.attack
    )
      continue
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
): boolean {
  const tile = findTileUnderEntity(game, entity)
  if (tile === undefined) return false
  if (isCharacterEntity(entity)) {
    const tileResource = getResource<EntityResourceInterface>(tile)
    if (tileResource?.walkable === false) return false
  }
  return true
}
