import GameInterface from "@/src/game/game/GameInterface"
import EntityInterface from "@/src/game/entity/EntityInterface"

export function getEntitiesInGame(game: GameInterface): EntityInterface[] {
  return Object.values(game.entities)
}
