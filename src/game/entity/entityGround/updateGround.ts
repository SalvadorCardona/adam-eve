import GameInterface from "@/src/game/game/GameInterface"
import { entityHasCollision } from "@/src/game/entity/useCase/entityHasCollision"
import { vector2ToVector3 } from "@/src/utils/3Dmath/Vector"
import { getByLdType } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = getByLdType<EntityInterface>(game.entities, "entity/ground")

  grounds.forEach((ground) => {
    grounds.forEach((ground) => {
      ground.connections.on = undefined
      Object.values(game.entities).forEach((entity) => {
        if (
          entityHasCollision(entity, {
            size: { x: 1, y: 1, z: 1 },
            position: vector2ToVector3(ground.position),
          })
        ) {
          ground.connections.on = entity["@id"]
        }
      })
    })
  })
}

export function updateGround({ entities }: { entities: EntityInterface[] }) {
  const size = 1

  entities.forEach((ground) => {
    // Reset connections
    ground.connections = {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    }

    // Check for neighboring grounds and update connections
    entities.forEach((otherGround) => {
      if (ground["@id"] !== otherGround["@id"]) {
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.y === otherGround.position.y + size
        ) {
          ground.connections.top = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.y + 1 === otherGround.position.y
        ) {
          ground.connections.bottom = otherGround["@id"]
        }
        if (
          ground.position.y === otherGround.position.y &&
          ground.position.x === otherGround.position.x + 1
        ) {
          ground.connections.left = otherGround["@id"]
        }
        if (
          ground.position.y === otherGround.position.y &&
          ground.position.x + 1 === otherGround.position.x
        ) {
          ground.connections.right = otherGround["@id"]
        }
      }
    })
  })
}
