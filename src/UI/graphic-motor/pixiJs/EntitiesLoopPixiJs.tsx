import React, { useState } from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import EntityInterface from "@/src/game/entity/EntityInterface"
import { CreateEntityComponent } from "@/src/game/actionUser/app/CreateEntityUserAction/CreateEntityComponent"
import { useGameFrame } from "@/src/UI/hook/useGameFrame"

export const EntitiesLoopPixiJs = () => {
  const [entities, setEntities] = useState<EntityInterface[]>([])

  useGameFrame((game) => {
    setEntities(Object.values(game.entities))
  })

  return (
    <>
      <CreateEntityComponent></CreateEntityComponent>
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
