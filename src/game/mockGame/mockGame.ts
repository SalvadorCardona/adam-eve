import GameInterface from "@/src/game/game/GameInterface"
import defaultMockGame from "./mocks/defaultMockGame.json"
import findPathMock from "./mocks/findPathMock.json"

export const mockGames: Record<string, GameInterface> = {
  // @ts-ignore
  defaultMock: defaultMockGame,
  // @ts-ignore
  findPathMock: findPathMock,
}
