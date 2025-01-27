import EntityInterface from "@/src/game/entity/EntityInterface"
import { distanceBetweenVector } from "@/src/utils/math/distanceBetweenVector"

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
