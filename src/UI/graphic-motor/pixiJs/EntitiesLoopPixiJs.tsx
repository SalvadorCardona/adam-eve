import useGameContext from "@/src/UI/provider/useGameContext"
import React from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"

export const EntitiesLoopThreeJs = () => {
  const gameContext = useGameContext()

  return (
    <>
      {Object.values(gameContext.game.entities).map((entity) => {
        return (
          <EntityDecoratorPixiJs
            key={"decorator" + entity["@id"]}
            entity={entity}
          ></EntityDecoratorPixiJs>
        )
      })}
    </>
  )
}
