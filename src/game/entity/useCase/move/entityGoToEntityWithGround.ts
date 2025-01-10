import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { findShortestPath, PathResult } from "@/src/utils/3Dmath/findShortestPath"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { consommeCurrentPathCoordinate } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"
import { entityQuery } from "@/src/game/entity/useCase/query/entityQuery"
import { EntityState } from "@/src/game/entity/EntityState"

export function entityGoToEntityWithGround(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game: GameInterface,
) {
  const hash: string = JSON.stringify([entitySource["@id"], entityTarget.position])
  if (
    entitySource.currentPathOfCoordinate &&
    entitySource.currentPathOfCoordinate.hash === hash
  ) {
    return consommeCurrentPathCoordinate(entitySource)
  }

  let currentPathOfCoordinate = {
    totalDistance: 0,
    pathCoordinate: [],
    currentCoordinate: 0,
    isFinish: true,
    unreachable: true,
    hash,
  }
  let path: PathResult | undefined = undefined

  try {
    path = findShortestPath(
      entitySource.position,
      entityTarget.position,
      entityQuery(game, { "@type": grassGroundEntityMetadata["@type"] }),
    )
  } catch (e) {}

  if (!path) {
    entitySource.currentPathOfCoordinate = currentPathOfCoordinate
    return entitySource.currentPathOfCoordinate
  }

  entitySource.currentPathOfCoordinate = {
    totalDistance: path?.totalDistance ?? 0,
    pathCoordinate: path?.path.map((e) => e.position) ?? [],
    currentCoordinate: 0,
    isFinish: true,
    unreachable: !!path,
    hash,
  }

  if (!entitySource.currentPathOfCoordinate.unreachable) {
    entitySource.state = EntityState.move
  }

  return consommeCurrentPathCoordinate(entitySource)
}
