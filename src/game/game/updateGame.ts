import GameInterface from "@/src/game/game/GameInterface"
import { JsonLDItem, updateContainerByType } from "@/src/utils/jsonLd/jsonLd"

export function updateGame(game: GameInterface, item: JsonLDItem<any>): void {
  updateContainerByType(game, item)
}
