import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/domain/entity/EntityMedataFactory"
import useGameContext from "@/src/game/provider/useGameContext"
import { Model2D } from "@/src/domain/entity/components/Model2D"
import { Model3D } from "@/src/domain/entity/components/Model3D"
import { vector3ToArray } from "@/src/domain/3D/Vector"

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

    let EntityComponent = entityMetaData.component

    if (!EntityComponent) {
      EntityComponent = Model2D
      if (entityMetaData.asset?.model3d) EntityComponent = Model3D
    }

    const entity = entityMetaData.factory({ entity: {} })

    const position = {
      z: Math.round(gameContext.game.mousePosition.z),
      y: Math.round(gameContext.game.mousePosition.y),
      x: Math.round(gameContext.game.mousePosition.x),
    }

    return (
      <group position={vector3ToArray(position)}>
        <EntityComponent entity={entity}></EntityComponent>
      </group>
    )
  },
})
