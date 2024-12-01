import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"

import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/game/domain/Vector"
import { useRef } from "react"
import { Mesh } from "three"
import { entityFactory } from "@/app/game/domain/entityFactory"

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
        scale={[1, 1, 1]}
        position={vector3ToArray(entity.position)}
      />
    )
  },
}
