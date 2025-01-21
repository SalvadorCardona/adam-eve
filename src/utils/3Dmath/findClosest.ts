import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterfaceInterface from "@/src/game/game/GameInterface"
import { JsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { distanceBetweenVector } from "@/src/utils/3Dmath/distanceBetweenVector"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"

/**
 * Make search and return earnest entity
 */
export const findClosestInGame = (
  entity: EntityInterface,
  targetsEntities: JsonLdType,
  game: GameInterfaceInterface,
): EntityInterface | undefined => {
  const targets = entityQuery<EntityInterface>(game, {
    "@type": targetsEntities,
  })

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
    const distance = distanceBetweenVector(character.position, entity.position)
    if (distance < minDistance) {
      minDistance = distance
      closestTree = entity
    }
  })

  return closestTree
}
