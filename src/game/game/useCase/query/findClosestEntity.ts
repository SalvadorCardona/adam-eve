import EntityInterface from "@/src/game/entity/EntityInterface"
import { distanceBetweenVector3 } from "@/packages/math/distanceBetweenVector3"
import { Vector3Interface } from "@/packages/math/vector"

export const findClosestEntity = (
  position: Vector3Interface,
  entities: EntityInterface[],
): EntityInterface[] => {
  return entities.sort((a, b) => {
    const distanceA = distanceBetweenVector3(position, a.position)
    const distanceB = distanceBetweenVector3(position, b.position)

    return distanceA - distanceB
  })
}
