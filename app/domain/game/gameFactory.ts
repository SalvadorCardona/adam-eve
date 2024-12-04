import GameInterface from "@/app/domain/game/GameInterface"

export function gameFactory(game?: GameInterface): GameInterface {
  return {
    entitySelection: null,
    time: 0,
    entities: {},
    inventory: {},
    ...(game ?? {}),
  }
}
