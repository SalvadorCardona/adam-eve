import { createContext } from "react"
import GameInterfaceInterface from "@/app/game/domain/GameInterface"

export interface GameContextInterface {
  game: GameInterfaceInterface
  updateGame: (game: GameInterfaceInterface) => void
}

export const GameContext = createContext<GameContextInterface>({
  game: {},
  updateGame: () => {},
})
