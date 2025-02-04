import {
  createVector2,
  Vector2Interface,
  Vector3Interface,
  vectorDimension,
} from "@/src/utils/math/vector"

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
  const size = vectorDimension(
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

export function boundingIsOver(
  boundingSource: BoundingInterface,
  boundingTarget: BoundingInterface,
): boolean {
  return (
    boundingTarget.min.x < boundingSource.min.x ||
    boundingTarget.max.x > boundingSource.max.x ||
    boundingTarget.min.y < boundingSource.min.y ||
    boundingTarget.max.y > boundingSource.max.y
  )
}

export function mergeBoundingCollection(
  bounds: BoundingInterface[],
): BoundingInterface {
  let matrixBounding = createBoundingByABB({
    min: createVector2(0, 0),
    max: createVector2(0, 0),
  })

  for (const bound of bounds) {
    matrixBounding = mergeBounding(matrixBounding, bound)
  }

  return matrixBounding
}

export function mergeBounding(
  bounding1: BoundingInterface,
  bounding2: BoundingInterface,
): BoundingInterface {
  const min = {
    x: Math.min(bounding1.min.x, bounding2.min.x),
    y: Math.min(bounding1.min.y, bounding2.min.y),
  }

  const max = {
    x: Math.max(bounding1.max.x, bounding2.max.x),
    y: Math.max(bounding1.max.y, bounding2.max.y),
  }

  const size = {
    x: max.x - min.x,
    y: max.y - min.y,
  }

  const position = {
    x: min.x + size.x / 2,
    y: min.y + size.y / 2,
  }

  return {
    min,
    max,
    size,
    position,
  }
}
