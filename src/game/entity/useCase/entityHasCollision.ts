import EntityInterface, { isGroundEntity } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { has2dCollision } from "@/src/utils/3Dmath/has2dCollision"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { appLdType } from "@/src/AppLdType"
import { bounding3ToBounding2 } from "@/src/utils/3Dmath/boudingBox"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/utils/3Dmath/Vector"

export function entityHasCollision(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
): boolean {
  const metaDataEntitySource = getMetaData<EntityMetaDataInterface>(entitySource)
  const metaDataentityTarget = getMetaData<EntityMetaDataInterface>(entityTarget)
  return has2dCollision(
    bounding3ToBounding2({
      position: entitySource.position,
      size: metaDataEntitySource.propriety.size as Vector3Interface,
    }),
    bounding3ToBounding2({
      position: entityTarget.position,
      size: metaDataentityTarget.propriety.size as Vector3Interface,
    }),
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
