import React, { useState } from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import EntityInterface, { isEntity } from "@/src/game/entity/EntityInterface"
import useGameContext from "@/src/UI/provider/useGameContext"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"

export const EntitiesLoopPixiJs = () => {
  const game = useGameContext().game
  const [entities, setEntities] = useState<EntityInterface[]>(
    Object.values(game.entities),
  )

  useGamePubSub("all", (e) => {
    if (
      isEntity(e.item as EntityInterface) &&
      (e.action == "create" || e.action == "remove")
    ) {
      setEntities(Object.values(game.entities))
    }
  })

  return (
    <>
      {entities.map((entity) => {
        return (
          <EntityDecoratorPixiJs
            key={"decorator-" + entity["@id"]}
            entity={entity}
          ></EntityDecoratorPixiJs>
        )
      })}
    </>
  )
}
