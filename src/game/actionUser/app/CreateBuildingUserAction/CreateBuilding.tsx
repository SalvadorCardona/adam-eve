import useGameContext from "@/src/UI/provider/useGameContext"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/createBuildingUserActionMetadata"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import React, { useMemo } from "react"

interface CreateBuildingPropsInterface {}

export const CreateBuilding = ({}: CreateBuildingPropsInterface) => {
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
        position: aroundVector({ ...mousePositon, y: 0 }, true),
        rotation: { x: 0, z: 0, y: rotationY },
      },
    })
  }, [entityMetaData, mousePositon, rotationY])

  const canBeBuild = useMemo(() => {
    return entityMetaData.canBeBuild({ entity, game })
  }, [mousePositon])

  const bgColor = canBeBuild ? "yellow" : "red"

  return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
}
