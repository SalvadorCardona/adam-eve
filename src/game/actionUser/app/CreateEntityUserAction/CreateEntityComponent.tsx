import useGameContext from "@/src/UI/provider/useGameContext"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import React, { useMemo, useState } from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import { createEntityUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createEntityUserActionMetadata"
import { Vector2Interface, vector2ToVector3 } from "@/src/utils/3Dmath/Vector"
import { useGamePubSub } from "@/src/UI/hook/useGameFrame"
import { appLdType } from "@/src/AppLdType"

export const CreateEntityComponent = () => {
  const game = useGameContext().game
  const [mousePosition, setMousePosition] = useState<Vector2Interface>(
    game.mouseState.position,
  )
  const rotationY = game.userControl?.rotation ?? 0
  const entityMetaData = createEntityUserActionMetadata.data.entityMetaData

  useGamePubSub(appLdType.mouseState, () => {
    setMousePosition(game.mouseState.position)
  })

  const entity = useMemo(() => {
    return entityMetaData
      ? entityMetaData.factory({
          game: game,
          entity: {
            position: vector2ToVector3(mousePosition),
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
