import { EntityMetaDataInterface } from "@/app/game/domain/EntityMetaDataInterface"
import { MutableRefObject, useMemo, useRef } from "react"
import { Mesh } from "three"
import { useGLTF } from "@react-three/drei"
import { updateContainer } from "@/packages/container/container"
import { vectorToArray } from "@/app/game/domain/Vector"
import { SkeletonUtils } from "three-stdlib"
import { jsonLdFactory } from "@/packages/utils/jsonLd/jsonLd"
import EntityInterface from "@/app/game/domain/EntityInterface"

export const characterEntityMetaData: EntityMetaDataInterface = {
  factory: () => {
    return jsonLdFactory<EntityInterface>("personnage/character", {
      position: {
        x: 1,
        y: 0,
        z: 1,
      },
      life: 60,
    })
  },
  type: "personnage/character",
  onFrame: ({ entity, game }) => {
    entity.position.x += Math.random() * 0.2 - 0.1
    entity.position.z += Math.random() * 0.2 - 0.1

    updateContainer(game, entity)
  },
  component: ({ entity }) => {
    const meshRef = useRef<Mesh>() as MutableRefObject<Mesh>
    const { scene } = useGLTF("./character-transformed.glb")
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    return (
      <primitive
        ref={meshRef}
        object={clone}
        scale={[0.5, 0.5, 0.5]}
        position={vectorToArray(entity.position)}
      />
    )
  },
}
