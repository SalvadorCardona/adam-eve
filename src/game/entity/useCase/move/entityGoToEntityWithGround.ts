import EntityInterface, { EntityState } from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { findShortestPath } from "@/src/utils/3Dmath/findShortestPath"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { consommeCurrentPathCoordinate } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"

export function entityGoToEntityWithGround(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game: GameInterface,
) {
  const hash: string = JSON.stringify([
    entitySource["@id"],
    entityTarget.position,
    game.gameCalculated.building,
  ])
  if (
    entitySource.currentPathOfCoordinate &&
    entitySource.currentPathOfCoordinate.hash === hash
  ) {
    return consommeCurrentPathCoordinate(entitySource)
  }

  const path = findShortestPath(
    entitySource.position,
    entityTarget.position,
    entityQuery(game, { "@type": grassGroundEntityMetadata["@type"] }),
  )

  entitySource.currentPathOfCoordinate = {
    totalDistance: path?.totalDistance ?? 0,
    pathCoordinate: path?.path.map((e) => e.position) ?? [],
    currentCoordinate: 0,
    isFinish: true,
    unreachable: path === null,
    hash,
  }

  if (entitySource.currentPathOfCoordinate.unreachable === false) {
    entitySource.state = EntityState.move
  }

  return consommeCurrentPathCoordinate(entitySource)
}
