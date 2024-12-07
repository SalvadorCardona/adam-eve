import { getMetaData } from "@/app/game/configGame"
import EntityInterface from "@/app/domain/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"
import useGameContext from "@/app/game/provider/useGameContext"
import { Model2D } from "@/app/domain/entity/components/Model2D"
import { Model3D } from "@/app/domain/entity/components/Model3D"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
}

export const EntityDecorator = ({ entity }: EntityDecoratorPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const gameContext = useGameContext()

  const selectEntity = () => {
    gameContext.game.entitySelection = entity
    gameContext.updateGame(gameContext.game)
  }

  let EntityComponent = entityMetaData.component

  if (!EntityComponent) {
    EntityComponent = Model2D
    if (entityMetaData.asset?.model3d) EntityComponent = Model3D
  }
 
  return (
    <group onClick={selectEntity}>
      <EntityComponent entity={entity} key={entity["@id"]}></EntityComponent>
    </group>
  )
}
