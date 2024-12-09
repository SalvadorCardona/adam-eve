import GameInterface from "@/app/domain/game/GameInterface"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"

export function gameFactory(game?: GameInterface): GameInterface {
  return jsonLdFactory("game", {
    entitySelection: undefined,
    entityShouldBeCreated: undefined,
    time: 0,
    actions: {},
    entities: {},
    inventory: {},
    ...(game ?? {}),
  })
}
