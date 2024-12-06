import { areVectorsEqual, Vector3Interface } from "@/app/domain/3D/Vector"
import { PathCoordinate } from "@/app/domain/3D/pathCoordinate/generatePathCoordinates"

interface ConsumePathCoordinateInterface {
  (params: { pathCoordinate: PathCoordinate; position: Vector3Interface }): {
    position: Vector3Interface
    pathCoordinate: PathCoordinate
    isFinish: boolean
  }
}

export const consumePathCoordinate: ConsumePathCoordinateInterface = ({
  pathCoordinate,
  position,
}) => {
  let newPathCoordinate = [...pathCoordinate]
  let newPosition = { ...position }
  let isFinish = false

  if (pathCoordinate.length < 2) {
    isFinish = true
  }

  if (areVectorsEqual(newPosition, newPathCoordinate[0])) {
    newPosition = newPathCoordinate[1]
    newPathCoordinate.splice(1, 1)
  } else {
    newPosition = newPathCoordinate[0]
    newPathCoordinate.splice(0, 1)
  }

  return {
    pathCoordinate: newPathCoordinate,
    position: newPosition,
    isFinish,
  }
}
