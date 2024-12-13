import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"
import useGameContext from "@/src/game/provider/useGameContext"
import { aroundVector } from "@/src/domain/3D/Vector"
import React from "react"
import { EntityDecorator } from "@/src/domain/entity/EntityDecorator"

export const buildRequest: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/helper/build-request",
  defaultEntity: () => {
    return {
      life: 50,
      size: {
        x: 4,
        y: 4,
        z: 4,
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

    return <EntityDecorator entity={entity}></EntityDecorator>
  },
})