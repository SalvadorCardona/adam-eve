import GameInterface from "@/src/game/game/GameInterface"
import { ActionInterface } from "@/src/game/action/ActionInterface"

export function updateNextTick(
  game: GameInterface,
  action: ActionInterface,
  nextTick: number,
): void {
  action.nextTick = game.time + nextTick
}
