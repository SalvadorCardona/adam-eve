import React, { ReactNode, useEffect } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/src/game/game/gameProcessor"
import { getMetaData } from "@/src/game/game/app/configGame"
import { GameMetadataInterface } from "@/src/game/game/GameMetaData"
import { createPubSub } from "@/src/utils/functionnal/pubsub"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game,
}: InputGameProviderPropsInterface) => {
  const pubSub = createPubSub()

  useEffect(() => {
    const metaData = getMetaData<GameMetadataInterface>(game)
    const frame = 1000 / (metaData.propriety.gameFrame * game.gameSpeed)
    const intervalId = setInterval(() => {
      const newGame = gameProcessor(game)
      updateGame(newGame)
      pubSub.publish(newGame)
    }, frame)

    return () => clearInterval(intervalId)
  }, [game.gameState, game.gameSpeed])

  const updateGame = (game: GameInterface) => {
    // setReactGame({ ...game })
    // setVersion(version + 1)
  }

  return (
    <GameContext.Provider
      value={{
        pubSub,
        game,
        updateGame,
        version: 0,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
