import { ReactNode, useEffect, useState } from "react"
import GameInterface from "@/app/domain/game/GameInterface"
import { GameContext } from "./GameContext"
import { gameProcessor } from "@/app/domain/game/gameProcessor"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game,
}: InputGameProviderPropsInterface) => {
  const [gamefake, fakesetGame] = useState<GameInterface>(game)
  const [version, setVersion] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGame(gameProcessor(game))
    }, 1000 / 60) // Intervalle de 1000ms (1 seconde)

    return () => clearInterval(intervalId) // Nettoyage de l'intervalle lors du démontage
  }, [])

  const updateGame = (game: GameInterface) => {
    fakesetGame({ ...game })
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
