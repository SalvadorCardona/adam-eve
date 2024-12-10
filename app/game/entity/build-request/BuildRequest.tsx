import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/app/domain/entity/EntityMedataFactory"
import useGameContext from "@/app/game/provider/useGameContext"
import { Model2D } from "@/app/domain/entity/components/Model2D"
import { Model3D } from "@/app/domain/entity/components/Model3D"
import { vector3ToArray } from "@/app/domain/3D/Vector"

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

    console.log(position)

    return (
      <group position={vector3ToArray(position)}>
        <EntityComponent entity={entity}></EntityComponent>
      </group>
    )
  },
})
