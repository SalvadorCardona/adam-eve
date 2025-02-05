import EntityInterface from "@/src/game/entity/EntityInterface"
import { Vector3Interface } from "@/src/utils/math/vector"

export function getEntitySize(entity: EntityInterface): Vector3Interface {
  return entity.size
}
