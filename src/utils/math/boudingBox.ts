import {
  Vector2Interface,
  Vector3Interface,
  vector3ToVector2,
} from "@/src/utils/math/Vector"

export interface BoundingBox3DInterface {
  size: Vector3Interface
  position: Vector3Interface
}

export interface BoundingBox2DInterface {
  size: Vector2Interface
  position: Vector2Interface
}

export function createBounding2D(
  params?: Partial<BoundingBox3DInterface>,
): BoundingBox2DInterface {
  return {
    position: { x: 0, y: 0 },
    size: { x: 0, y: 0 },
    ...params,
  }
}

export function bounding3ToBounding2(
  boundingBox: BoundingBox3DInterface,
): BoundingBox2DInterface {
  return {
    size: vector3ToVector2(boundingBox.size),
    position: vector3ToVector2(boundingBox.position),
  }
}

interface BoundingBox2DOBB {
  min: Vector2Interface
  max: Vector2Interface
}

export function boundingBox2DObbToAabb(
  boundingBox: BoundingBox2DInterface,
): BoundingBox2DOBB {
  const half: Vector2Interface = {
    x: Math.abs(boundingBox.size.x / 2),
    y: Math.abs(boundingBox.size.y / 2),
  }

  return {
    min: {
      x: boundingBox.position.x - half.x,
      y: boundingBox.position.y - half.y,
    },
    max: {
      x: boundingBox.position.x + half.x,
      y: boundingBox.position.y + half.y,
    },
  }
}

export function createBoundingBoxFromVectors(
  start: Vector2Interface,
  end: Vector2Interface,
): BoundingBox2DInterface {
  const minX = Math.min(start.x, end.x)
  const minY = Math.min(start.y, end.y)
  const maxX = Math.max(start.x, end.x)
  const maxY = Math.max(start.y, end.y)

  const size: Vector2Interface = {
    x: maxX - minX,
    y: maxY - minY,
  }

  const position: Vector2Interface = {
    x: minX + size.x / 2,
    y: minY + size.y / 2,
  }

  return {
    size,
    position,
  }
}
