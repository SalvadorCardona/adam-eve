import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/packages/math/vector"

export function getEntitySize(entity: EntityInterface): Vector3Interface {
  return entity.size
}
