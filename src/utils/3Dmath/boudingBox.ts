import {
  isVector3,
  Vector2Interface,
  vector2ToVector3,
  Vector3Interface,
  vector3ToVector2,
} from "@/src/utils/3Dmath/Vector"

export interface BoundingBox3DInterface {
  size: Vector3Interface
  position: Vector3Interface
}

export interface BoundingBox2DInterface {
  size: Vector2Interface
  position: Vector2Interface
}

export function createBounding3D(
  params?: Partial<BoundingBox3DInterface>,
): BoundingBox3DInterface {
  return {
    position: { x: 0, y: 0, z: 0 },
    size: { x: 0, y: 0, z: 0 },
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

export function bounding2ToBounding3(
  boundingBox: BoundingBox2DInterface,
): BoundingBox3DInterface {
  return {
    size: vector2ToVector3(boundingBox.size),
    position: vector2ToVector3(boundingBox.position),
  }
}

export function bounding2DSize(
  bounding: BoundingBox2DInterface | BoundingBox3DInterface,
): number {
  const vector: Vector2Interface = isVector3(bounding.size)
    ? vector3ToVector2(bounding.size)
    : bounding.size

  return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

interface BoundingBox3DOBB {
  min: Vector3Interface
  max: Vector3Interface
}

export function boundingBoxObbToAabb(
  boundingBox: BoundingBox3DInterface,
): BoundingBox3DOBB {
  const half: Vector3Interface = {
    x: Math.abs(boundingBox.size.x),
    y: Math.abs(boundingBox.size.y),
    z: Math.abs(boundingBox.size.z),
  }

  // const half: Vector3Interface = {
  //   x: Math.abs(boundingBox.size.x / 2),
  //   y: Math.abs(boundingBox.size.y / 2),
  //   z: Math.abs(boundingBox.size.z / 2),
  // }

  return {
    min: {
      x: boundingBox.position.x - half.x,
      y: boundingBox.position.y - half.y,
      z: boundingBox.position.z - half.z,
    },
    max: {
      x: boundingBox.position.x + half.x,
      y: boundingBox.position.y + half.y,
      z: boundingBox.position.z + half.z,
    },
  }
}
