import React, { ReactNode, useEffect, useState } from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/src/game/game/gameProcessor"
import { getMetaData } from "@/src/game/game/app/configGame"
import { GameMetadataInterface } from "@/src/game/game/GameMetaData"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game,
}: InputGameProviderPropsInterface) => {
  const [, setReactGame] = useState<GameInterface>(game)
  const [version, setVersion] = useState<number>(0)

  useEffect(() => {
    const metaData = getMetaData<GameMetadataInterface>(game)
    const frame = 1000 / (metaData.propriety.gameFrame * game.gameSpeed)
    const intervalId = setInterval(() => {
      const newGame = gameProcessor(game)
      updateGame(newGame)
    }, frame)

    return () => clearInterval(intervalId)
  }, [game.gameState, game.gameSpeed])

  const updateGame = (game: GameInterface) => {
    // setReactGame({ ...game })
    setVersion(version + 1)
  }

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame,
        version,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
