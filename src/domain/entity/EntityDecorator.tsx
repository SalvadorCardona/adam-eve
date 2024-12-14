import EntityInterface from "@/src/domain/entity/EntityInterface"
import { EntityMetaDataInterface } from "@/src/domain/entity/EntityMetaDataInterface"
import { Model2D } from "@/src/domain/entity/components/Model2D"
import { Model3D } from "@/src/domain/entity/components/Model3D"
import { ActionControllerList, controller } from "@/src/domain/controller/controller"
import { getMetaData } from "@/src/game/configGame"
import React from "react"
import { vector3ToArray } from "@/src/domain/3D/Vector"

interface EntityDecoratorPropsInterface {
  entity: EntityInterface
}

export const EntityDecorator = ({ entity }: EntityDecoratorPropsInterface) => {
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
      <primitive ref={ref} object={clone} scale={vector3ToArray(entity.scale)} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[entity.size.x, entity.size.z]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </group>
  )
}
