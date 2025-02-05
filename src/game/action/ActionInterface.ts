import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"
import GameInterface from "@/src/game/game/GameInterface"

export interface ActionInterface<T> extends BaseJsonLdInterface {
  data: T
  nextTick?: number
}

export function updateNextTick(
  game: GameInterface,
  action: ActionInterface<any>,
  nextTick: number,
): void {
  action.nextTick = game.time + nextTick
}
