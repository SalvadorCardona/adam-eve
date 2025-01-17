import GameInterface from "@/src/game/game/GameInterface"
import { updateContainer } from "@/src/container/container"
import { JsonLDItem } from "@/src/utils/jsonLd/jsonLd"

export function updateGame(game: GameInterface, item: JsonLDItem<any>): void {
  updateContainer(game, item)
}
