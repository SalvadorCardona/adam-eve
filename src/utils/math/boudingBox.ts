import {
  Vector2Interface,
  Vector3Interface,
  vectorSize,
} from "@/src/utils/math/Vector"

export interface BoundingBox3DOBBInterface {
  size: Vector3Interface
  position: Vector3Interface
  min: Vector3Interface
  max: Vector3Interface
}

export interface BoundingAABInterface {
  min: Vector2Interface
  max: Vector2Interface
}

export interface BoundingOBBInterface {
  size: Vector2Interface
  position: Vector2Interface
}

export interface BoundingInterface
  extends BoundingAABInterface,
    BoundingOBBInterface {
  size: Vector2Interface
  position: Vector2Interface
  min: Vector2Interface
  max: Vector2Interface
  id?: string
}

export function createBoundingByABB(
  params: BoundingAABInterface & { id?: string },
): BoundingInterface {
  const { max, min, id } = params
  const size = vectorSize(
    {
      x: min.x,
      y: min.y,
    },
    {
      x: max.x,
      y: max.y,
    },
  )

  const half: Vector2Interface = {
    x: Math.abs(size.x / 2),
    y: Math.abs(size.y / 2),
  }

  const position = {
    x: min.x + half.x,
    y: min.y + half.y,
  }

  return {
    id,
    size,
    position,
    min,
    max,
  }
}

export function createBoundingByOBB(
  params: BoundingOBBInterface & { id?: string },
): BoundingInterface {
  const { position, size, id } = params

  const half: Vector2Interface = {
    x: Math.abs(size.x / 2),
    y: Math.abs(size.y / 2),
  }

  return {
    id,
    size,
    position,
    min: {
      x: position.x - half.x,
      y: position.y - half.y,
    },
    max: {
      x: position.x + half.x,
      y: position.y + half.y,
    },
  }
}

export function createBoundingFromZone(
  start: Vector2Interface,
  end: Vector2Interface,
): BoundingInterface {
  return createBoundingByABB({
    min: {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    },
    max: {
      x: Math.max(start.x, end.x),
      y: Math.max(start.y, end.y),
    },
  })
}
