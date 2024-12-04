import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"

import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { entityFactory } from "@/app/domain/entity/entityFactory"

useGLTF.preload("./forum.glb")

export const forumEntityMetaData: EntityMetaDataInterface = {
  factory: entityFactory,
  ["@type"]: "personnage/forum",
  onFrame: ({ entity, game }) => {},
  component: ({ entity }) => {
    const glb = useGLTF("./forum.glb") // Load the GLB model
    return (
      <primitive
        object={glb.scene}
        scale={[1, 1, 1]}
        position={vector3ToArray(entity.position)}
      />
    )
  },
}
