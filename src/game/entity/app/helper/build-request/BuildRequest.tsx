import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import useGameContext from "@/src/UI/provider/useGameContext"
import React from "react"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { hasCollisionInGame } from "@/src/game/entity/useCase/entityHasCollision"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"
import { createBuildingUserActionMetadata } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuildingUserActionMetadata"
import { hasActionUser } from "@/src/game/actionUser/hasActionUser"
import { aroundVector } from "@/src/utils/3Dmath/aroundVector"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const buildRequest: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityHelper, "build-request"),
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

    const entity = entityMetaData.factory({
      context: "build-request",
      game: gameContext.game,
    })
    entity.position = aroundVector(gameContext.game.userControl.mousePosition, true)

    const collision = hasCollisionInGame(gameContext.game, entity)
    const bgColor = collision ? "red" : "yellow"

    gameContext.game.userControl.mouseIcon = collision
      ? mouseIcon.cantBeBuild
      : mouseIcon.build

    return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
  },
})
