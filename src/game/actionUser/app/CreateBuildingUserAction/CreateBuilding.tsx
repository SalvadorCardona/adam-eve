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
  const entityMetaData = createBuildingUserActionMetadata.data.entityMetaData
  const mousePositon = game.userControl.mouseState.bounding3D.position
  const entity = useMemo(() => {
    return entityMetaData.factory({
      game: game,
    })
  }, [entityMetaData])

  const canBeBuild = useMemo(() => {
    return entityMetaData.canBeBuild({ entity, game })
  }, [mousePositon])

  const oldY = entity.position.y
  entity.position = aroundVector(mousePositon, true)
  entity.position.y = oldY
  const bgColor = canBeBuild ? "yellow" : "red"
  entity.rotation.y = game.userControl?.rotation ?? 0

  return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
}
