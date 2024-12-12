import { getMetaData } from "@/src/game/configGame"
import EntityInterface from "@/src/domain/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import useGameContext from "@/src/game/provider/useGameContext"
import { Model2D } from "@/src/domain/entity/components/Model2D"
import { Model3D } from "@/src/domain/entity/components/Model3D"
import { ActionControllerList, controller } from "@/src/domain/controller/controller"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
}

export const EntityDecorator = ({ entity }: EntityDecoratorPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface
  const gameContext = useGameContext()

  const clickOnEntity = () => {
    controller({
      entity,
      action: ActionControllerList.ClickOnEntity,
    })
  }

  let EntityComponent = entityMetaData.component

  if (!EntityComponent) {
    EntityComponent = Model2D
    if (entityMetaData.asset?.model3d) EntityComponent = Model3D
  }

  return (
    <group onClick={clickOnEntity}>
      <EntityComponent entity={entity} key={entity["@id"]}></EntityComponent>
    </group>
  )
}
