import GameInterface from "@/src/game/game/GameInterface"
import { JsonLDItem, updateContainer } from "@/src/utils/jsonLd/jsonLd"

export function updateGame(game: GameInterface, item: JsonLDItem<any>): void {
  updateContainer(game, item)
}
