import { Vector3Interface } from "@/src/domain/3D/Vector"
import EntityInterface from "@/src/domain/entity/EntityInterface"

export function hasCollision(
  entity1: EntityInterface,
  entity2: EntityInterface,
): boolean {
  const isOverlap = (
    pos1: Vector3Interface,
    size1: Vector3Interface,
    pos2: Vector3Interface,
    size2: Vector3Interface,
  ) => {
    return (
      Math.abs(pos1.x - pos2.x) < (size1.x + size2.x) / 2 &&
      Math.abs(pos1.y - pos2.y) < (size1.y + size2.y) / 2 &&
      Math.abs(pos1.z - pos2.z) < (size1.z + size2.z) / 2
    )
  }

  return isOverlap(entity1.position, entity1.size, entity2.position, entity2.size)
}
