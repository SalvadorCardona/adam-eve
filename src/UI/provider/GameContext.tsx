import { createContext } from "react"
import GameInterfaceInterface, { gameFactory } from "@/src/game/game/GameInterface"
import { createPubSub, PubSub } from "@/src/utils/functionnal/pubsub"

export interface GameContextInterface {
  game: GameInterfaceInterface
  updateGame: (game: GameInterfaceInterface) => void
  version: number
  pubSub: PubSub
}

export const GameContext = createContext<GameContextInterface>({
  version: 0,
  game: gameFactory(),
  updateGame: () => {},
  pubSub: createPubSub(),
})
