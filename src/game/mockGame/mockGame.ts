import GameInterface from "@/src/game/game/GameInterface"
import defaultMockGame from "./mocks/defaultMockGame.json"

export const mockGames: Record<string, GameInterface> = {
  // @ts-ignore
  defaultMock: defaultMockGame,
}
