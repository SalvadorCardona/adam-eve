import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface, {
  GroundEntityInterface,
} from "@/src/game/entity/EntityInterface"
import { appLdType } from "@/src/AppLdType"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Vector3Interface } from "@/src/utils/math/vector"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = entityQuery<GroundEntityInterface>(game, {
    "@typeIn": appLdType.entityGround,
  })

  updateGround({ entities: grounds })
}

export function updateGround({ entities }: { entities: EntityInterface[] }) {
  const dimension = getMetaData<EntityMetaDataInterface>(appLdType.grassGroundEntity)
    .propriety.size as Vector3Interface
  const size = dimension.x

  entities.forEach((ground) => {
    // Reset connections
    ground.connections = {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
      topRight: undefined,
      topLeft: undefined,
      bottomLeft: undefined,
      bottomRight: undefined,
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
          ground.position.z === otherGround.position.z - size
        ) {
          ground.connections.bottom = otherGround["@id"]
        }
        if (
          ground.position.z === otherGround.position.z &&
          ground.position.x === otherGround.position.x + size
        ) {
          ground.connections.left = otherGround["@id"]
        }
        if (
          ground.position.z === otherGround.position.z &&
          ground.position.x === otherGround.position.x - size
        ) {
          ground.connections.right = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x + size &&
          ground.position.z === otherGround.position.z + size
        ) {
          ground.connections.topLeft = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x - size &&
          ground.position.z === otherGround.position.z + size
        ) {
          ground.connections.topRight = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x + size &&
          ground.position.z === otherGround.position.z - size
        ) {
          ground.connections.bottomLeft = otherGround["@id"]
        }
        if (
          ground.position.x === otherGround.position.x - size &&
          ground.position.z === otherGround.position.z - size
        ) {
          ground.connections.bottomRight = otherGround["@id"]
        }
      }
    })
  })
}
