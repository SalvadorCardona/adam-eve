import {
  areVectorsEqual,
  MaybeVector3Interface,
  Vector3Interface,
} from "@/src/game/3D/Vector"
import { PathCoordinate } from "@/src/game/3D/pathCoordinate/generatePathCoordinates"

interface ConsumePathCoordinateInterface {
  (params: { pathCoordinate: PathCoordinate; position: MaybeVector3Interface }): {
    position: MaybeVector3Interface
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
  const rotation = { x: 0, y: 0, z: 0 } // Initialisation de la rotation

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
    z: (newPosition?.z ?? 0) - (position.z ?? 0),
  }

  rotation.z = Math.atan2(direction.y, direction.x) * (180 / (Math.PI * 6))

  return {
    pathCoordinate: newPathCoordinate,
    position: newPosition,
    isFinish,
    rotation,
  }
}
