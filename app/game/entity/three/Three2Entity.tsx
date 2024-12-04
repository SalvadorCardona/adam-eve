import { EntityMetaDataInterface } from "@/app/domain/entity/EntityMetaDataInterface"

import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/domain/3D/Vector"
import { useRef } from "react"
import { Mesh } from "three"
import { entityFactory } from "@/app/domain/entity/entityFactory"

useGLTF.preload("./low_poly_tree.glb")

export const threeEntityMetaData: EntityMetaDataInterface = {
  factory: entityFactory,
  ["@type"]: "personnage/three",
  onFrame: ({ entity, game }) => {},
  component: ({ entity }) => {
    const meshRef = useRef<Mesh>()
    const glb = useGLTF("./low_poly_tree.glb") // Load the GLB model
    return (
      <primitive
        ref={meshRef}
        object={glb.scene}
        scale={[0.2, 0.2, 0.2]}
        position={vector3ToArray(entity.position)}
      />
    )
  },
}
