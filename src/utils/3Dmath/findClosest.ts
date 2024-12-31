import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterfaceInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { distanceBetweenVector2 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import { vector3ToVector2 } from "@/src/utils/3Dmath/Vector"

/**
 * Make search and return earnest entity
 */
export const findClosestInGame = (
  entity: EntityInterface,
  targetsEntities: JsonLdType,
  game: GameInterfaceInterface,
): EntityInterface | undefined => {
  const targets = getByLdType<EntityInterface>(game.entities, targetsEntities)
  return findClosest(entity, targets)
}

export const findClosest = (
  entity: EntityInterface,
  entities: EntityInterface[],
  minDistance: number = Infinity,
): EntityInterface | undefined => {
  const character = entity
  let closestTree: EntityInterface | undefined = undefined

  entities.forEach((entity) => {
    const distance = distanceBetweenVector2(
      vector3ToVector2(entity.position),
      vector3ToVector2(character.position),
    )

    if (distance < minDistance) {
      minDistance = distance
      closestTree = entity
    }
  })

  return closestTree
}
