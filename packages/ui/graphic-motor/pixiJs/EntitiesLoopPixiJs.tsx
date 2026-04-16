import React, { useState } from "react"
import { EntityDecoratorPixiJs } from "@/packages/ui/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import EntityInterface, { isEntity } from "@/packages/game/entity/EntityInterface"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"

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
