import { createContext } from "react"
import GameInterfaceInterface from "@/src/domain/game/GameInterface"
import { gameFactory } from "@/src/domain/game/gameFactory"

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
