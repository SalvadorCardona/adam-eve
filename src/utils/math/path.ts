import { Vector2Interface } from "@/src/utils/math/vector"

export type PathInterface = Vector2Interface[]

export interface PathResponseInterface {
  distance: number
  isFinish: boolean
  unreachable: boolean
}

export interface ConsumablePathInterface {
  path: PathInterface
  start: Vector2Interface
  end: Vector2Interface
  distance: number
  currentPath: number
  currentPosition: Vector2Interface
  currentRotation?: number
  isFinish: boolean
  hash?: string
  unreachable: boolean
}

function pathIsFinish(consumablePath: ConsumablePathInterface) {
  return !consumablePath.path[consumablePath.currentPath + 1]
}

export function createConsumablePath(path: PathInterface): ConsumablePathInterface {
  const consumablePath = {
    distance: path.length,
    start: path[0],
    end: path.at(-1) as Vector2Interface,
    currentPath: 0,
    path: path,
    isFinish: false,
    currentPosition: path[0],
    unreachable: false,
  }

  consumablePath.isFinish = pathIsFinish(consumablePath)

  return consumablePath
}

export function consumePath(
  consumablePath: ConsumablePathInterface,
): ConsumablePathInterface {
  consumablePath.currentPath++
  consumablePath.isFinish = pathIsFinish(consumablePath)
  if (!consumablePath.isFinish) {
    consumablePath.currentPosition = consumablePath.path[consumablePath.currentPath]
  }

  return consumablePath
}
