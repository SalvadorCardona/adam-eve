import GameInterface from "@/packages/game/game/GameInterface"
import { GroundEntityInterface } from "@/packages/game/entity/EntityInterface"
import { appLdType } from "@/app/AppLdType"
import {
  Vector2Interface,
  vector3ToVector2,
  vectorAddition,
} from "@/packages/math/vector"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import {
  Direction,
  getInMatrix,
  Matrix2DInterface,
  matrixDirection,
} from "@/packages/math/matrix"
import { JsonLdIri } from "@/packages/jsonLd/jsonLd"

export function updateGroundWithGame({ game }: { game: GameInterface }) {
  const grounds = entityQuery<GroundEntityInterface>(game, {
    "@typeIn": appLdType.entityGround,
  })

  if (!game.gameWorld?.groundMatrix) {
    return
  }

  grounds.forEach((ground) => {
    const newConnections = {} as Partial<Record<Direction, JsonLdIri>>
    Object.keys(matrixDirection).forEach((direction) => {
      const directionVector = matrixDirection[
        direction as Direction
      ] as Vector2Interface
      const neighbor = getInMatrix(
        game.gameWorld.groundMatrix as Matrix2DInterface,
        vectorAddition(directionVector, vector3ToVector2(ground.position)),
      )
      if (neighbor) {
        newConnections[direction as Direction] = neighbor as string
      }
    })

    ground.connections = newConnections
  })
}
