import EntityInterface from "@/src/domain/entity/EntityInterface"
import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/src/domain/3D/Vector"
import { getMetaData } from "@/src/game/configGame"
import React from "react"

interface Model3DPropsInterface {
  entity: EntityInterface
}

export const Model3D = ({ entity }: Model3DPropsInterface) => {
  const metaData = getMetaData(entity)
  if (!metaData.asset?.model3d) {
    return
  }

  const glb = useGLTF(metaData.asset.model3d) // Load the GLB model

  return (
    <primitive object={glb.scene.clone()} scale={vector3ToArray(entity.scale)} />
  )
}
