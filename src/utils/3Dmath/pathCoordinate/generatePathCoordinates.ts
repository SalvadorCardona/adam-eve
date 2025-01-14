import { Vector3Interface } from "@/src/utils/3Dmath/Vector"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"

export type PathCoordinate = Vector3Interface[]

export interface CurrentPathCoordinateInterface {
  pathCoordinate: PathCoordinate
  currentCoordinate: number
  totalDistance: number
  isFinish: boolean
  unreachable: boolean
  hash: string
}

export function consommeCurrentPathCoordinate(entity: EntityInterface) {
  if (!entity.currentPathOfCoordinate) return
  const meta = getMetaData<EntityMetaDataInterface>(entity)
  const speed = meta.propriety.speed ?? 0.01
  const currentPathOfCoordinate = entity.currentPathOfCoordinate
  const nextCoordinate =
    currentPathOfCoordinate.pathCoordinate[currentPathOfCoordinate.currentCoordinate]
  if (!nextCoordinate) {
    entity.currentPathOfCoordinate.isFinish
    return
  }

  const direction = {
    x: nextCoordinate.x - entity.position.x,
    y: nextCoordinate.y - entity.position.y,
    z: nextCoordinate.z - entity.position.z,
  }

  const length = Math.sqrt(direction.x ** 2 + direction.z ** 2)
  const normalizedDirection = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length,
  }

  entity.rotation.y = Math.atan2(normalizedDirection.x, normalizedDirection.z)
  console.log(normalizedDirection.x)

  entity.position.x += normalizedDirection.x * speed
  entity.position.z += normalizedDirection.z * speed

  if (length <= 0.1) {
    currentPathOfCoordinate.currentCoordinate++
  }

  entity.currentPathOfCoordinate.isFinish = currentPathCoordinateIsFinish(
    currentPathOfCoordinate,
  )

  return entity.currentPathOfCoordinate
}

export function currentPathCoordinateIsFinish(
  currentPathCoordinate: CurrentPathCoordinateInterface,
): boolean {
  return (
    currentPathCoordinate.pathCoordinate.length - 1 ===
    currentPathCoordinate.currentCoordinate
  )
}
