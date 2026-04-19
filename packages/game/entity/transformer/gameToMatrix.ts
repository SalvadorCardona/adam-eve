import GameInterface from "@/packages/game/game/GameInterface"
import { Matrix2DInterface, subtractMatrix } from "@/packages/math/matrix"
import { entityQuery } from "@/packages/game/game/useCase/query/entityQuery"
import { BuildingEntityInterface } from "@/packages/game/entity/EntityInterface"
import { entitiesToMatrix } from "@/packages/game/entity/transformer/entitiesToMatrix"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export function gameToMatrix(game: GameInterface): Matrix2DInterface {
  const grounds = entityQuery(game, { entityType: EntityType.ground })
  const buildings = entityQuery<BuildingEntityInterface>(game, {
    entityType: EntityType.building,
  })

  game.gameWorld.groundMatrix = entitiesToMatrix(grounds)
  const buildingMatrix = entitiesToMatrix(buildings)

  return subtractMatrix(game.gameWorld.groundMatrix, buildingMatrix)
}
