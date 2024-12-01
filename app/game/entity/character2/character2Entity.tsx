"use client"

import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"
import { useRef } from "react"
import { Mesh } from "three"
import { useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/app/game/domain/Vector"
import { entityFactory } from "@/app/game/domain/entityFactory"

useGLTF.preload("./low_poly_human.glb")

export const character2: EntityMetaDataInterface = {
  factory: entityFactory,
  ["@type"]: "personnage/house2",
  onFrame: ({ entity, game }) => {},
  component: ({ entity }) => {
    const meshRef = useRef<Mesh>()
    const glb = useGLTF("./low_poly_human.glb") // Load the GLB model
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
