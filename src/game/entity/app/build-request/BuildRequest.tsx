import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import useGameContext from "@/src/UI/provider/useGameContext"
import { aroundVector } from "@/src/game/3D/Vector"
import React from "react"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { hasCollisionInGame } from "@/src/game/entity/hasCollision"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"

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
      !gameContext.game.userControl.entityShouldBeCreated ||
      !gameContext.game.userControl.mousePosition
    ) {
      return
    }

    const entityMetaData = gameContext.game.userControl.entityShouldBeCreated

    const entity = entityMetaData.factory({ context: "build-request" })
    entity.position = aroundVector(gameContext.game.userControl.mousePosition)

    const collision = hasCollisionInGame(gameContext.game, entity)
    const bgColor = collision ? "red" : "yellow"
    gameContext.game.userControl.entityShouldBeCreatedCollision = collision
      ? collision
      : undefined

    gameContext.game.userControl.mouseIcon = collision
      ? mouseIcon.cantBeBuild
      : mouseIcon.build

    return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
  },
})
