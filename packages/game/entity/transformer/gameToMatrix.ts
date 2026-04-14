import GameInterface from "@/packages/game/game/GameInterface"
import { Matrix2DInterface, subtractMatrix } from "@/packages/math/matrix"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { appLdType } from "@/app/AppLdType"
import { BuildingEntityInterface } from "@/packages/game/entity/EntityInterface"
import { entitiesToMatrix } from "@/packages/game/entity/transformer/entitiesToMatrix"

export function gameToMatrix(game: GameInterface): Matrix2DInterface {
  const grounds = entityQuery(game, { "@typeIn": appLdType.entityGround })
  const buildings = entityQuery<BuildingEntityInterface>(game, {
    "@typeIn": appLdType.entityBuilding,
  })

  game.gameWorld.groundMatrix = entitiesToMatrix(grounds)
  const buildingMatrix = entitiesToMatrix(buildings)

  return subtractMatrix(game.gameWorld.groundMatrix, buildingMatrix)
}
