import { EntityMetaDataInterface } from "@/app/game/domain/entity/EntityMetaDataInterface"

import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/game/domain/Vector"
import { entityFactory } from "@/app/game/domain/entity/entityFactory"

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
