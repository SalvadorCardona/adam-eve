import EntityInterface from "@/packages/game/entity/EntityInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { updateEntityInGame } from "@/packages/game/game/useCase/command/updateEntityInGame"

export function applyDamageToEntity(
  game: GameInterface,
  target: EntityInterface,
  damage: number,
): void {
  target.life -= damage
  target.lastHitAt = game.time
  updateEntityInGame(game, target)
}
