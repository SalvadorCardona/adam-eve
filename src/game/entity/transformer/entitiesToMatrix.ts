import GameInterface from "@/src/game/game/GameInterface"
import { getEntitiesInGame } from "@/src/game/game/useCase/query/getEntitiesInGame"

interface gameEntitiesToMatrixParams {}

interface gameEntitiesToMatrixResult {}

export function entitiesToMatrix(game: GameInterface): gameEntitiesToMatrixResult {
  const entities = getEntitiesInGame(game)
}
