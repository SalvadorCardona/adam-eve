import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import { findShortestPath } from "@/src/utils/3Dmath/findShortestPath"
import { vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { GroundEntityInterface } from "@/src/game/entity/entityGround/GroundEntityInterface"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { consommeCurrentPathCoordinate } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"

let ground: GroundEntityInterface | undefined = undefined

export function entityGoToEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game: GameInterface,
) {
  if (entitySource.currentPathOfCoordinate) {
    return consommeCurrentPathCoordinate(entitySource)
  }

  if (!ground) {
    ground = getByLdType<GroundEntityInterface>(
      game.entities,
      grassGroundEntityMetadata["@type"],
    )[0]
  }

  const path = findShortestPath(
    vector3ToVector2(entitySource.position),
    vector3ToVector2(entityTarget.position),
    ground.roadNetwork,
  )

  entitySource.currentPathOfCoordinate = {
    totalDistance: path?.totalDistance ?? 0,
    pathCoordinate: path?.path.map((e) => e.position) ?? [],
    currentCoordinate: 0,
    isFinish: true,
  }

  return consommeCurrentPathCoordinate(entitySource)
}
