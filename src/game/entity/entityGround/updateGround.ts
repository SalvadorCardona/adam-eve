import GameInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import EntityInterface from "@/src/game/entity/EntityInterface"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = getByLdType<EntityInterface>(game.entities, "entity/ground")

  updateGround({ entities: grounds })
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

    entities.forEach((otherGround) => {
      if (ground["@id"] !== otherGround["@id"]) {
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.z === otherGround.position.z + size
        ) {
          ground.connections.top = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.z + 1 === otherGround.position.z
        ) {
          ground.connections.bottom = otherGround["@id"]
        }
        if (
          ground.position.z === otherGround.position.z &&
          ground.position.x === otherGround.position.x + 1
        ) {
          ground.connections.left = otherGround["@id"]
        }
        if (
          ground.position.z === otherGround.position.z &&
          ground.position.x + 1 === otherGround.position.x
        ) {
          ground.connections.right = otherGround["@id"]
        }
      }
    })
  })
}
