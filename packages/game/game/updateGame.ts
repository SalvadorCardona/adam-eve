import GameInterface from "@/packages/game/game/GameInterface"
import { JsonLDItem, updateContainerByType } from "@/packages/jsonLd/jsonLd"

export function updateGame(game: GameInterface, item: JsonLDItem<any>): void {
  updateContainerByType(game, item)
}
