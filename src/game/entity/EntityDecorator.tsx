import EntityInterface from "@/src/game/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { Model2D } from "@/src/game/entity/components/Model2D"
import { Model3D } from "@/src/game/entity/components/Model3D"
import { ActionControllerList, controller } from "@/src/UI/controller"
import { getMetaData } from "@/src/game/game/app/configGame"
import React from "react"
import { vector3ToArray } from "@/src/game/3D/Vector"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
  bgColor?: string
}

export const EntityDecorator = ({
  entity,
  bgColor,
}: EntityDecoratorPropsInterface) => {
  const entityMetaData = getMetaData(entity) as EntityMetaDataInterface

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
    <group
      onClick={clickOnEntity}
      position={vector3ToArray(entity.position)}
      rotation={vector3ToArray(entity.rotation)}
    >
      <EntityComponent entity={entity}></EntityComponent>
      {bgColor && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[entity.size.x, entity.size.z]} />
          <meshStandardMaterial color={bgColor} />
        </mesh>
      )}
    </group>
  )
}
