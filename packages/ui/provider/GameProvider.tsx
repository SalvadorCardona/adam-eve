import React, { ReactNode, useEffect, useState } from "react"
import GameInterface, { GameOption } from "@/packages/game/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { createPubSub } from "coooking-pubsub"

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
  useGamePubSub("gameOption", (e) => {
    const gameOption = e.item as GameOption
    setVersion(gameOption["@version"] ?? 0)
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
