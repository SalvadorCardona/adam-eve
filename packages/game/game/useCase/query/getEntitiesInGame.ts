import GameInterface from "@/packages/game/game/GameInterface"
import EntityInterface from "@/packages/game/entity/EntityInterface"

export function getEntitiesInGame(game: GameInterface): EntityInterface[] {
  return Object.values(game.entities)
}
