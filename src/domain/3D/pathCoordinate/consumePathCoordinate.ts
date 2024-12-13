import { areVectorsEqual, Vector3Interface } from "@/src/domain/3D/Vector"
import { PathCoordinate } from "@/src/domain/3D/pathCoordinate/generatePathCoordinates"

interface ConsumePathCoordinateInterface {
  (params: { pathCoordinate: PathCoordinate; position: Vector3Interface }): {
    position: Vector3Interface
    rotation: Vector3Interface
    pathCoordinate: PathCoordinate
    isFinish: boolean
  }
}

export const consumePathCoordinate: ConsumePathCoordinateInterface = ({
  pathCoordinate,
  position,
}) => {
  const newPathCoordinate = [...pathCoordinate]
  let newPosition = { ...position }
  let isFinish = false
  let rotation = { x: 0, y: 0, z: 0 } // Initialisation de la rotation

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

  const direction = {
    x: newPosition.x - position.x,
    y: newPosition.y - position.y,
    z: newPosition.z - position.z,
  }

  rotation.y = Math.atan2(direction.x, direction.z) * (180 / Math.PI)

  return {
    pathCoordinate: newPathCoordinate,
    position: newPosition,
    isFinish,
    rotation
  }
}
