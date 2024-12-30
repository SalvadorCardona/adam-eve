import { GroundNetwork } from "@/src/game/entity/ground/GroundInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { entityHasCollision } from "@/src/game/entity/entityHasCollision"
import { vector2ToVector3 } from "@/src/game/3D/Vector"
import { getByLdType } from "@/src/container/container"
import { GroundEntityInterface } from "@/src/game/entity/ground/GroundEntityInterface"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = getByLdType<GroundEntityInterface>(game.entities, "entity/ground")

  grounds.forEach((ground) => {
    ground.roadNetwork.forEach((ground) => {
      ground.hasBuilding = undefined
      Object.values(game.entities).forEach((entity) => {
        if (
          entityHasCollision(entity, {
            size: { x: 1, y: 1, z: 1 },
            position: vector2ToVector3(ground.position),
          })
        ) {
          ground.hasBuilding = entity["@id"]
        }
      })
    })
  })
}

export function updateGround({ grid }: { grid: GroundNetwork }) {
  const size = 1

  grid.forEach((ground) => {
    // Reset connections
    ground.connections = {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
    }

    // Check for neighboring grounds and update connections
    grid.forEach((otherGround) => {
      if (ground["@id"] !== otherGround["@id"]) {
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.y === otherGround.position.y + size
        ) {
          ground.connections.top = ground["@id"]
        }
        if (
          ground.position.x === otherGround.position.x &&
          ground.position.y + 1 === otherGround.position.y
        ) {
          ground.connections.bottom = ground["@id"]
        }
        if (
          ground.position.y === otherGround.position.y &&
          ground.position.x === otherGround.position.x + 1
        ) {
          ground.connections.left = ground["@id"]
        }
        if (
          ground.position.y === otherGround.position.y &&
          ground.position.x + 1 === otherGround.position.x
        ) {
          ground.connections.right = ground["@id"]
        }
      }
    })
  })
}
