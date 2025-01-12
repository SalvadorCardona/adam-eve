import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import React, { useState } from "react"
import { useFrame } from "@react-three/fiber"

interface EntitiesLoopPropsInterface {}

export const EntitiesLoop = () => {
  const gameContext = useGameContext()

  const [gameCalculatedIdValue, setGameCalculatedIdValue] = useState(
    gameContext.game.gameCalculated["global"]["@id"],
  )

  useFrame(() => {
    if (gameCalculatedIdValue !== gameContext.game.gameCalculated["global"]["@id"]) {
      setGameCalculatedIdValue(gameContext.game.gameCalculated["global"]["@id"])
    }
  })
  
  return (
    <>
      {Object.values(gameContext.game.entities).map((entity) => {
        return (
          <EntityDecorator
            key={"decorator" + entity["@id"]}
            entity={entity}
          ></EntityDecorator>
        )
      })}
    </>
  )
}
