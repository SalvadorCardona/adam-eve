import {
  baseFactory,
  EntityMetaDataInterface,
} from "@/app/game/domain/EntityMetaDataInterface"

import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/game/domain/Vector"
import { useRef } from "react"
import { Mesh } from "three"

export const threeEntityMetaData: EntityMetaDataInterface = {
  factory: baseFactory,
  type: "personnage/three",
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
