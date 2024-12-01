import { createContext } from "react"
import GameInterfaceInterface, { gameFactory } from "@/app/game/domain/GameInterface"

export interface GameContextInterface {
  game: GameInterfaceInterface
  updateGame: (game: GameInterfaceInterface) => void
  version: number
}

export const GameContext = createContext<GameContextInterface>({
  version: 0,
  game: gameFactory(),
  updateGame: () => {},
})
