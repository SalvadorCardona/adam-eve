import { Vector2Interface } from "@/src/utils/3Dmath/Vector"

export const has2dCollision = (
  pos1: Vector2Interface,
  size1: Vector2Interface,
  pos2: Vector2Interface,
  size2: Vector2Interface,
) => {
  return (
    Math.abs(pos1.x - pos2.x) < (size1.x + size2.x) / 2 &&
    Math.abs(pos1.y - pos2.y) < (size1.y + size2.y) / 2
  )
}

export const has2dCollisionInZone = (
  pos1: Vector2Interface,
  size1: Vector2Interface,
  start: Vector2Interface,
  end: Vector2Interface,
): boolean => {
  const withinXBounds = pos1.x >= start.x && (pos1.x + size1.x) <= end.x;
  const withinYBounds = pos1.y >= start.y && (pos1.y + size1.y) <= end.y;
  
  return withinXBounds && withinYBounds;
}