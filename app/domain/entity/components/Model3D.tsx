import EntityInterface from "@/app/domain/entity/EntityInterface"
import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { getMetaData } from "@/app/game/configGame"

interface Model3DPropsInterface {
  entity: EntityInterface
}

export const Model3D = ({ entity }: Model3DPropsInterface) => {
  const metaData = getMetaData(entity)
  if (!metaData.asset?.model3d) {
    console.warn("Component 3D not found")

    return
  }

  const glb = useGLTF(metaData.asset.model3d) // Load the GLB model
  
  return (
    <primitive
      object={glb.scene}
      scale={vector3ToArray(entity.scale)}
      position={vector3ToArray(entity.position)}
    />
  )
}
