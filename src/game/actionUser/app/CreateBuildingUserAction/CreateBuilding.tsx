import useGameContext from "@/src/UI/provider/useGameContext"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/createBuildingUserActionMetadata"
import React, { useMemo } from "react"
import { EntityDecoratorResolver } from "@/src/UI/graphic-motor/EntityDecoratorResolver"

export const CreateBuilding = () => {
  const game = useGameContext().game

  if (
    !hasActionUser(game, createBuildingUserActionMetadata) ||
    !createBuildingUserActionMetadata.data.entityMetaData
  ) {
    return
  }
  const rotationY = game.userControl?.rotation ?? 0
  const entityMetaData = createBuildingUserActionMetadata.data.entityMetaData
  const mousePositon = game.userControl.mouseState.bounding3D.position
  const entity = useMemo(() => {
    return entityMetaData.factory({
      game: game,
      entity: {
        position: mousePositon,
        rotation: { x: 0, z: 0, y: rotationY },
      },
    })
  }, [entityMetaData, mousePositon, rotationY])

  const canBeBuild = useMemo(() => {
    return entityMetaData.canBeBuild({ entity, game })
  }, [mousePositon])

  const color = canBeBuild ? "yellow" : "red"

  return (
    <EntityDecoratorResolver color={color} entity={entity}></EntityDecoratorResolver>
  )
}
