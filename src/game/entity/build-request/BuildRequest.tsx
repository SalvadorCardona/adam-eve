import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"
import useGameContext from "@/src/game/provider/useGameContext"
import { aroundVector } from "@/src/domain/3D/Vector"
import React from "react"
import { EntityDecorator } from "@/src/domain/entity/EntityDecorator"
import { hasCollisionInGame } from "@/src/domain/entity/hasCollision"

export const buildRequest: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/helper/build-request",
  defaultEntity: () => {
    return {
      size: {
        x: 0,
        y: 0,
        z: 0,
      },
    }
  },
  component: () => {
    const gameContext = useGameContext()
    if (!gameContext.game.entityShouldBeCreated || !gameContext.game.mousePosition) {
      return <></>
    }

    const entityMetaData = gameContext.game.entityShouldBeCreated

    const entity = entityMetaData.factory({ entity: {} })
    entity.position = aroundVector(gameContext.game.mousePosition)

    const bgColor = hasCollisionInGame(gameContext.game, entity) ? "red" : "yellow"

    return <EntityDecorator bgColor={bgColor} entity={entity}></EntityDecorator>
  },
})
