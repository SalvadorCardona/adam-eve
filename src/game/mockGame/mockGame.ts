import GameInterface from "@/src/game/game/GameInterface"
import defaultMockGame from "./mocks/defaultMockGame.json"
import pixiMickGame from "./mocks/pixiMockGame.json"

export const mockGames: Record<string, GameInterface> = {
  // @ts-ignore
  defaultMock: defaultMockGame,
  // @ts-ignore
  pixiMickGame,
}
