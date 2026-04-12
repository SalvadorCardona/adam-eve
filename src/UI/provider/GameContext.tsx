import { createContext } from "react"
import GameInterfaceInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { createPubSub, Index } from "coooking-pubsub"

export interface GameContextInterface {
  game: GameInterfaceInterface
  updateGame: (game: GameInterfaceInterface) => void
  version: number
  pubSub: Index
}

export const GameContext = createContext<GameContextInterface>({
  version: 0,
  game: gameFactory(),
  updateGame: () => {},
  pubSub: createPubSub(),
})
