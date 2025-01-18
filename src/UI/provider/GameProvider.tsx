import React, { ReactNode, useEffect, useState } from "react"
import GameInterface, { GameOption } from "@/src/game/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/src/game/game/gameProcessor"
import { createPubSub } from "@/src/utils/functionnal/pubsub"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game,
}: InputGameProviderPropsInterface) => {
  const pubSub = createPubSub()
  const [version, setVersion] = useState(1)
  useGamePubSub(appLdType.gameOption, (e) => {
    const gameOption = e.item as GameOption
    setVersion(gameOption["@version"])
  })

  useEffect(() => {
    const frame = 1000 / (45 * game.gameOption.gameSpeed)
    const intervalId = setInterval(() => {
      const newGame = gameProcessor(game)
      updateGame(newGame)
      pubSub.publish(newGame)
    }, frame)

    return () => clearInterval(intervalId)
  }, [version])

  const updateGame = (game: GameInterface) => {
    // setReactGame({ ...game })
    // setVersion(version + 1)
  }

  return (
    <GameContext
      value={{
        pubSub,
        game,
        updateGame,
        version: 0,
      }}
    >
      {children}
    </GameContext>
  )
}
