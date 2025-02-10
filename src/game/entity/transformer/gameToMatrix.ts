import GameInterface from "@/src/game/game/GameInterface"
import { Matrix2DInterface, subtractMatrix } from "@/src/utils/math/matrix"
import { entityQuery } from "@/src/game/game/useCase/query/entityQuery"
import { appLdType } from "@/src/AppLdType"
import { BuildingEntityInterface } from "@/src/game/entity/EntityInterface"
import { entitiesToMatrix } from "@/src/game/entity/transformer/entitiesToMatrix"

export function gameToMatrix(game: GameInterface): Matrix2DInterface {
  const grounds = entityQuery(game, { "@typeIn": appLdType.entityGround })
  const buildings = entityQuery<BuildingEntityInterface>(game, {
    "@typeIn": appLdType.entityBuilding,
  })

  game.gameWorld.groundMatrix = entitiesToMatrix(grounds)
  const buildingMatrix = entitiesToMatrix(buildings)

  return subtractMatrix(game.gameWorld.groundMatrix, buildingMatrix)
}
