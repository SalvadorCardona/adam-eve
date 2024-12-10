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
    return
  }

  const glb = useGLTF(metaData.asset.model3d) // Load the GLB model

  return (
    <group position={vector3ToArray(entity.position)}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[entity.size.x, entity.size.z]} />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <primitive object={glb.scene.clone()} scale={vector3ToArray(entity.scale)} />
    </group>
  )
}
