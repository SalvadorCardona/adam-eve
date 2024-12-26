import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import useGameContext from "@/src/UI/provider/useGameContext"
import { aroundVector } from "@/src/game/3D/Vector"
import React from "react"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { hasCollisionInGame } from "@/src/game/entity/entityHasCollision"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuildingUserActionMetadata"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"

export const buildRequest: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/helper/build-request",
  defaultEntity: () => {
    return {
      collisionAble: false,
    }
  },
  component: () => {
    const gameContext = useGameContext()

    if (
      !hasActionUser(gameContext.game, createBuildingUserActionMetadata) ||
      !gameContext.game.userControl.mousePosition ||
      !createBuildingUserActionMetadata.data.entityMetaData
    ) {
      return
    }

    const entityMetaData = createBuildingUserActionMetadata.data.entityMetaData

    const entity = entityMetaData.factory({ context: "build-request" })
    entity.position = aroundVector(gameContext.game.userControl.mousePosition)

    const collision = hasCollisionInGame(gameContext.game, entity)
    const bgColor = collision ? "red" : "yellow"

    gameContext.game.userControl.mouseIcon = collision
      ? mouseIcon.cantBeBuild
      : mouseIcon.build

    return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
  },
})
