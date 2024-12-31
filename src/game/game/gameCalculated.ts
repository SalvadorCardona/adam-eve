import GameInterface from "@/src/game/game/GameInterface"
import createUniqId from "@/src/utils/id/createUniqId"
import { getByLdType } from "@/src/container/container"
import { appLdType } from "@/src/AppLdType"

export interface GameCalculatedInterface {
  building: {
    hash: string
    count: number
  }
  character: {
    hash: string
    count: number
  }
}

export function gameCalculated(game: GameInterface): GameCalculatedInterface {
  return {
    building: {
      hash: createUniqId(),
      count: getByLdType(game.entities, appLdType.entityBuilding).length,
    },
    character: {
      hash: createUniqId(),
      count: getByLdType(game.entities, appLdType.entityCharacter).length,
    },
  }
}
