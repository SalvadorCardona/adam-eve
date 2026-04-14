import GameInterface from "@/packages/game/game/GameInterface"
import { ActionInterface } from "@/packages/game/action/ActionInterface"

export function updateNextTick(
  game: GameInterface,
  action: ActionInterface,
  nextTick: number,
): void {
  action.nextTick = game.time + nextTick
}
