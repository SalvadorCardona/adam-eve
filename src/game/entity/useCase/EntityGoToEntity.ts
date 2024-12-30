import EntityInterface from "@/src/game/entity/EntityInterface"
import { consumePathCoordinate } from "@/src/game/3D/pathCoordinate/consumePathCoordinate"
import { entityHasCollision } from "@/src/game/entity/entityHasCollision"
import GameInterface from "@/src/game/game/GameInterface"
import { generatePathCoordinates } from "@/src/game/3D/pathCoordinate/generatePathCoordinates"
import { getByLdType } from "@/src/container/container"
import { GroundEntityInterface } from "@/src/game/entity/ground/GroundEntityInterface"
import { vector3ToVector2 } from "../../3D/Vector"
import { findPath } from "@/src/game/3D/findRoad"

export function entityGoToEntity(
  entitySource: EntityInterface,
  entityTarget: EntityInterface,
  game?: GameInterface,
) {
  let pathCoordinate = generatePathCoordinates(
    entitySource.position,
    entityTarget.position,
  )
  if (game) {
    const ground = getByLdType<GroundEntityInterface>(
      game.entities,
      "entity/ground/grass",
    )[0]
    console.log(ground)
    try {
      console.log("avant")
      const findRoutse = findPath({
        roadNetwork: ground.roadNetwork,
        start: vector3ToVector2(entitySource.position),
        end: vector3ToVector2(entityTarget.position),
      })
    } catch (e) {
      debugger
    }
  }
  // if (!pathCoordinate) {
  //   throw new Error("problem path")
  // }

  const consumePathCoordinateResult = consumePathCoordinate({
    position: entitySource.position,
    pathCoordinate: pathCoordinate,
  })

  if (consumePathCoordinateResult.isFinish) {
    return consumePathCoordinateResult
  }

  entitySource.rotation = consumePathCoordinateResult.rotation
  entitySource.position = consumePathCoordinateResult.position

  if (entityHasCollision(entitySource, entityTarget)) {
    consumePathCoordinateResult.isFinish = true
  }

  return consumePathCoordinateResult
}
