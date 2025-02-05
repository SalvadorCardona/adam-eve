import GameInterface from "@/src/game/game/GameInterface"
import { GroundEntityInterface } from "@/src/game/entity/EntityInterface"
import { appLdType } from "@/src/AppLdType"
import {
  Vector2Interface,
  vector3ToVector2,
  vectorAddition,
} from "@/src/utils/math/vector"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { Direction, getInMatrix, matrixDirection } from "@/src/utils/math/matrix"
import { JsonLdIri } from "@/src/utils/jsonLd/jsonLd"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = entityQuery<GroundEntityInterface>(game, {
    "@typeIn": appLdType.entityGround,
  })

  grounds.forEach((ground) => {
    const newConnections = {} as Partial<Record<Direction, JsonLdIri>>
    Object.keys(matrixDirection).forEach((direction) => {
      const directionVector = matrixDirection[
        direction as Direction
      ] as Vector2Interface
      const neighbor = getInMatrix(
        game.gameWorld.entitiesMatrix,
        vectorAddition(directionVector, vector3ToVector2(ground.position)),
      )
      if (neighbor) {
        newConnections[direction as Direction] = neighbor as string
      }
    })
    ground.connections = newConnections
  })
}
