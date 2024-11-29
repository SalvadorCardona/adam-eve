import { PropsWithChildren, useState } from "react"
import GameInterface from "@/app/game/domain/GameInterface"
import { GameContext } from "./GameContext"
import configGame from "@/app/game/config/configGame"
import { useFrame } from "@react-three/fiber"

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

  useFrame((state, delta, xrFrame) => {
    {
      Object.values(game.entities).map((entity) => {
        const entityMetaData = configGame[entity["@type"]]
        return entityMetaData.onFrame({ entity, game })
      })
    }
    updateGame(game)
  })

  return (
    <GameContext.Provider
      value={{
        game,
        updateGame
      }}
    >
      {Object.values(game.entities).map((entity) => {
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
