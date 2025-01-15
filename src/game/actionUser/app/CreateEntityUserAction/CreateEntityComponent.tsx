import useGameContext from "@/src/UI/provider/useGameContext"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import React, { useMemo } from "react"
import { EntityDecoratorPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntityDecoratorPixiJs"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateEntityUserAction/createBuildingUserActionMetadata"

export const CreateEntityComponent = () => {
  const game = useGameContext().game
  const rotationY = game.userControl?.rotation ?? 0
  const entityMetaData = createBuildingUserActionMetadata.data.entityMetaData

  const mousePositon = game.userControl.mouseState.bounding3D.position

  const entity = useMemo(() => {
    return entityMetaData
      ? entityMetaData.factory({
          game: game,
          entity: {
            position: mousePositon,
            rotation: { x: 0, z: 0, y: rotationY },
          },
        })
      : undefined
  }, [entityMetaData, mousePositon, rotationY])

  const canBeBuild = useMemo(() => {
    return entityMetaData && entity
      ? entityMetaData.canBeBuild({ entity, game })
      : false
  }, [mousePositon])

  if (
    !hasActionUser(game, createBuildingUserActionMetadata) ||
    !createBuildingUserActionMetadata.data.entityMetaData ||
    !entity
  ) {
    return
  }

  const color = canBeBuild ? "yellow" : "red"

  return (
    <EntityDecoratorPixiJs color={color} entity={entity}></EntityDecoratorPixiJs>
  )
}
