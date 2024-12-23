import { MaybeVector3Interface } from "@/src/game/3D/Vector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { GroundEntityInterface } from "@/src/game/entity/app/road/RoadEntityMetadata"

interface Collision2D {
  position: MaybeVector3Interface
  size: MaybeVector3Interface
}

export function hasCollision(entity1: Collision2D, entity2: Collision2D): boolean {
  const isOverlap = (
    pos1: MaybeVector3Interface,
    size1: MaybeVector3Interface,
    pos2: MaybeVector3Interface,
    size2: MaybeVector3Interface,
  ) => {
    if (pos1.z && pos2.z && size1.z && size2.z) {
      return (
        Math.abs(pos1.x - pos2.x) < (size1.x + size2.x) / 2 &&
        Math.abs(pos1.y - pos2.y) < (size1.y + size2.y) / 2 &&
        Math.abs(pos1.z - pos2.z) < (size1.z + size2.z) / 2
      )
    }

    return (
      Math.abs(pos1.x - pos2.x) < (size1.x + size2.x) / 2 &&
      Math.abs(pos1.y - pos2.y) < (size1.y + size2.y) / 2
    )
  }

  return isOverlap(entity1.position, entity1.size, entity2.position, entity2.size)
}

function isGroundEntity(entity: EntityInterface): entity is GroundEntityInterface {
  return entity.type === "ground"
}

export function hasCollisionInGame(
  game: GameInterface,
  entity: EntityInterface,
): false | EntityInterface {
  const canBeCollision: EntityInterface[] = Object.values(game.entities).filter(
    (e) => e && e !== entity && e.collisionAble,
  )

  for (const otherEntity of canBeCollision) {
    if (
      entity.type !== "ground" &&
      otherEntity.type !== "ground" &&
      hasCollision(entity, otherEntity)
    ) {
      return otherEntity
    }
    if (isGroundEntity(entity) && !isGroundEntity(otherEntity)) {
      for (const roadNetwork of entity.roadNetwork) {
        if (
          hasCollision(
            { position: roadNetwork.position, size: { x: 1, y: 1 } },
            otherEntity,
          )
        ) {
          return otherEntity
        }
      }
    }
    if (!isGroundEntity(entity) && isGroundEntity(otherEntity)) {
      for (const roadNetwork of otherEntity.roadNetwork) {
        if (
          hasCollision(entity, {
            position: roadNetwork.position,
            size: { x: 1, y: 1 },
          })
        ) {
          return otherEntity
        }
      }
    }
    if (isGroundEntity(entity) && isGroundEntity(otherEntity)) {
      for (const roadNetwork1 of entity.roadNetwork) {
        for (const roadNetwork2 of otherEntity.roadNetwork) {
          console.log(roadNetwork1)
          if (
            hasCollision(
              { position: roadNetwork1.position, size: { x: 1, y: 1 } },
              {
                position: roadNetwork2.position,
                size: { x: 1, y: 1 },
              },
            )
          ) {
            return otherEntity
          }
        }
      }
    }
  }

  return false
}
