import GameInterface from "@/packages/game/game/GameInterface"
import {
  BaseJsonLdItemInterface,
  updateContainerByType,
} from "@/packages/jsonLd/jsonLd"

export function updateGame(
  game: GameInterface,
  item: BaseJsonLdItemInterface,
): void {
  updateContainerByType(game, item)
}
