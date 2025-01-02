import EntityInterface from "@/src/game/entity/EntityInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { getByLdType } from "@/src/container/container"
import { findShortestPath } from "@/src/utils/3Dmath/findShortestPath"
import { vector3ToVector2 } from "@/src/utils/3Dmath/Vector"
import { GroundEntityInterface } from "@/src/game/entity/entityGround/GroundEntityInterface"
import { grassGroundEntityMetadata } from "@/src/game/entity/app/ground/grass/GrassGroundEntityMetadata"
import { consommeCurrentPathCoordinate } from "@/src/utils/3Dmath/pathCoordinate/generatePathCoordinates"
import { JsonLdIri } from "@/src/utils/jsonLd/jsonLd"

let groundIri: JsonLdIri | undefined = undefined

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

  if (!groundIri) {
    groundIri = getByLdType<GroundEntityInterface>(
      game.entities,
      grassGroundEntityMetadata["@type"],
    )[0]["@id"]
  }

  const ground = game.entities[groundIri] as GroundEntityInterface

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
    unreachable: !!path,
    hash,
  }

  return consommeCurrentPathCoordinate(entitySource)
}
