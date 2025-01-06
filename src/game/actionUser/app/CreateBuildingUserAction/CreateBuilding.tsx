import useGameContext from "@/src/UI/provider/useGameContext"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/createBuildingUserActionMetadata"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import React from "react"

interface CreateBuildingPropsInterface {}

export const CreateBuilding = ({}: CreateBuildingPropsInterface) => {
  const game = useGameContext().game

  if (
    !hasActionUser(game, createBuildingUserActionMetadata) ||
    !game.userControl.mouseState.mousePosition ||
    !createBuildingUserActionMetadata.data.entityMetaData
  ) {
    return
  }

  const entityMetaData = createBuildingUserActionMetadata.data.entityMetaData

  const entity = entityMetaData.factory({
    context: "build-request",
    game: game,
  })

  entity.position = aroundVector(game.userControl.mouseState.mousePosition, true)

  const canBeBuild = entityMetaData.canBeBuild({ entity, game })
  const bgColor = canBeBuild ? "yellow" : "red"
  entity.rotation.y = game.userControl?.rotation ?? 0

  return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
}
