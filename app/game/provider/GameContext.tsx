import { createContext } from "react"
import GameInterfaceInterface from "@/app/domain/game/GameInterface"
import { gameFactory } from "@/app/domain/game/gameFactory"

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
