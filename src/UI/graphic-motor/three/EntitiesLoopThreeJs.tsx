import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecoratorThreeJs } from "@/src/UI/graphic-motor/three/EntityDecoratorThreeJs"
import React from "react"

export const EntitiesLoopThreeJs = () => {
  const gameContext = useGameContext()

  return (
    <>
      {Object.values(gameContext.game.entities).map((entity) => {
        return (
          <EntityDecoratorThreeJs
            key={"decorator" + entity["@id"]}
            entity={entity}
          ></EntityDecoratorThreeJs>
        )
      })}
    </>
  )
}
