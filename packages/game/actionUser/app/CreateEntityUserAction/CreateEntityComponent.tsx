import useGameContext from "@/packages/UI/provider/useGameContext"
import { hasActionUser } from "@/packages/game/actionUser/hasActionUser"
import React, { useMemo, useState } from "react"
import { EntityDecoratorPixiJs } from "@/packages/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import { createEntityUserActionMetadata } from "@/packages/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"
import { Vector2Interface, vector2ToVector3 } from "@/packages/math/vector"
import { useGamePubSub } from "@/packages/UI/hook/useGameFrame"
import { vectorRatioDown } from "@/packages/math/ratio"

export const CreateEntityComponent = () => {
  const game = useGameContext().game
  const [mousePosition, setMousePosition] = useState<Vector2Interface>(
    game.mouseState.position,
  )
  const rotationY = game.userControl?.rotation ?? 0
  const entityMetaData = createEntityUserActionMetadata.data.entityMetaData

  useGamePubSub("mouseState", () => {
    setMousePosition(game.mouseState.position)
  })

  const entity = useMemo(() => {
    return entityMetaData
      ? entityMetaData.factory({
          game: game,
          entity: {
            position: vectorRatioDown(
              vector2ToVector3(mousePosition),
              game.camera.zoom,
            ),
            rotation: rotationY,
          },
        })
      : undefined
  }, [entityMetaData, mousePosition, rotationY])

  const canBeBuild = useMemo(() => {
    return entityMetaData && entity
      ? entityMetaData.canBeBuild({ entity, game })
      : false
  }, [mousePosition])

  if (
    !hasActionUser(game, createEntityUserActionMetadata) ||
    !createEntityUserActionMetadata.data.entityMetaData ||
    !entity
  ) {
    return
  }

  entity.position.y = 5

  const color = canBeBuild ? "yellow" : "red"

  return (
    <EntityDecoratorPixiJs color={color} entity={entity}></EntityDecoratorPixiJs>
  )
}
