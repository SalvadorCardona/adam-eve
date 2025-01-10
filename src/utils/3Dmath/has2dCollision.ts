import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { BoundingBox2DInterface } from "@/src/utils/3Dmath/boudingBox"

export const has2dCollision = (
  boundingSource: BoundingBox2DInterface,
  boundingTarget: BoundingBox2DInterface,
) => {
  return (
    Math.abs(boundingSource.position.x - boundingTarget.position.x) <
      (boundingSource.size.x + boundingTarget.size.x) / 2 &&
    Math.abs(boundingSource.position.y - boundingTarget.position.y) <
      (boundingSource.size.y + boundingTarget.size.y) / 2
  )
}

export const has2dCollisionInZone = (
  pos1: Vector2Interface,
  size1: Vector2Interface,
  start: Vector2Interface,
  end: Vector2Interface,
): boolean => {
  const withinXBounds = pos1.x >= start.x && pos1.x + size1.x <= end.x
  const withinYBounds = pos1.y >= start.y && pos1.y + size1.y <= end.y

  return withinXBounds && withinYBounds
}
