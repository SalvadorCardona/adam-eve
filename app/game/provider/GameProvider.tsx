import { PropsWithChildren, useState } from "react"
import GameInterface from "@/app/game/domain/GameInterface"
import { GameContext } from "./GameContext"
import configGame from "@/app/game/config/configGame"

interface InputGameProviderPropsInterface extends PropsWithChildren {
  game: GameInterface
}

export const GameProvider = ({
                               children,
                               game: baseGame
                             }: InputGameProviderPropsInterface) => {
  const [game, setGame] = useState<GameInterface>(baseGame)

  const updateGame = (game: GameInterface) => {
    setGame({ ...game })
  }

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame
      }}
    >
      {Object.values(game).map((entity) => {
        const entityMetaData = configGame[entity["@type"]]
        return (
          <entityMetaData.component
            entity={entity}
            key={entity["@id"]}
          ></entityMetaData.component>
        )
      })}
      {children}
    </GameContext.Provider>
  )
}
