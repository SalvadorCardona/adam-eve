import React, { ReactNode, useEffect, useMemo, useState } from "react"
import GameInterface, { GameOption } from "@/packages/game/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/packages/game/game/gameProcessor"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { updateItem } from "@/packages/jsonLd/jsonLd"
import { createPubSub } from "coooking-pubsub"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game,
}: InputGameProviderPropsInterface) => {
  const pubSub = useMemo(() => createPubSub(), [])
  const [version, setVersion] = useState(1)

  useGamePubSub("gameOption", (e) => {
    const gameOption = e.item as GameOption
    setVersion(gameOption["@version"] ?? 0)
  })

  const updateGame = (nextGame: GameInterface) => {
    updateItem(nextGame)
    pubSub.publish(nextGame)
  }

  useEffect(() => {
    const frame = 1000 / (45 * game.gameOption.gameSpeed)
    const intervalId = setInterval(() => {
      updateGame(gameProcessor(game))
    }, frame)

    return () => clearInterval(intervalId)
  }, [version])

  return (
    <GameContext
      value={{
        pubSub,
        game,
        updateGame,
        version,
      }}
    >
      {children}
    </GameContext>
  )
}
