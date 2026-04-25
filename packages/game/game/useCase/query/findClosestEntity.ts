import EntityInterface from "@/packages/game/entity/EntityInterface"
import { distanceSquaredBetweenVector3 } from "@/packages/math/distanceBetweenVector3"
import { Vector3Interface } from "@/packages/math/vector"

export const findClosestEntity = (
  position: Vector3Interface,
  entities: EntityInterface[],
): EntityInterface[] => {
  return entities.sort((a, b) => {
    const distanceA = distanceSquaredBetweenVector3(position, a.position)
    const distanceB = distanceSquaredBetweenVector3(position, b.position)

    return distanceA - distanceB
  })
}
