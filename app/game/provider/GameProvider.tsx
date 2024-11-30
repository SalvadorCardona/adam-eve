import { ReactNode, useEffect, useState } from "react"
import GameInterface from "@/app/game/domain/GameInterface"
import { GameContext } from "./GameContext"
import configGame from "@/app/game/config/configGame"
import { persistLocalStorage } from "@/packages/utils/localStorage/localStorage"

interface InputGameProviderPropsInterface {
  game: GameInterface
  children?: ReactNode
}

export const GameProvider = ({
  children,
  game: baseGame,
}: InputGameProviderPropsInterface) => {
  const [game, setGame] = useState<GameInterface>(baseGame)

  useEffect(() => {
    const intervalId = setInterval(() => {
      Object.values(game.entities).map((entity) => {
        const entityMetaData = configGame[entity["@type"]]
        return entityMetaData.onFrame({ entity, game })
      })

      persistLocalStorage("game", game)
      updateGame(game)
    }, 1000 / 60) // Intervalle de 1000ms (1 seconde)

    return () => clearInterval(intervalId) // Nettoyage de l'intervalle lors du démontage
  }, [])

  const updateGame = (game: GameInterface) => {
    setGame({ ...game })
  }

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
