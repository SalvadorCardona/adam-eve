import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterfaceInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"

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
    const distance = distanceBetweenVector3(character.position, entity.position)
    if (distance < minDistance) {
      minDistance = distance
      closestTree = entity
    }
  })

  return closestTree
}
