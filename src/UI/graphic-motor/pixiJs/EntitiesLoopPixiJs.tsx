import useGameContext from "@/src/UI/provider/useGameContext"
import React, { useState } from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import EntityInterface from "@/src/game/entity/EntityInterface"

export const EntitiesLoopPixiJs = () => {
  const gameContext = useGameContext()
  const [entities, setEntities] = useState<EntityInterface[]>([])

  const game = useGameContext()

  game.pubSub.subscribe((e) => {
    setEntities(Object.values(e.entities))
  })

  return (
    <>
      {entities.map((entity) => {
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
