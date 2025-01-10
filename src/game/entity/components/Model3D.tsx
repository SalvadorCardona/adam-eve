import EntityInterface from "@/src/game/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Box3, Group, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { EntityState } from "@/src/game/entity/EntityState"

interface Model3DPropsInterface {
  entity: EntityInterface
}

export const Model3D = ({ entity }: Model3DPropsInterface) => {
  const metaData = getMetaData<EntityMetaDataInterface>(entity)
  if (!metaData.asset?.model3d) {
    return
  }

  const glb = useGLTF(metaData.asset.model3d)
  const ref = useRef<Group>()
  const clone = useMemo(() => SkeletonUtils.clone(glb.scene), [glb.scene])
  const { actions } = useAnimations(glb.animations, ref)

  useEffect(() => {
    if (!metaData.asset?.animationMapper || !entity?.state) return
    console.log(Object.keys(actions))
    const animationMapped = metaData.asset.animationMapper[entity.state]

    if (animationMapped && actions[animationMapped] && actions) {
      actions[animationMapped]?.play()
    }

    return () => {
      if (actions && actions.Running) {
        actions.Running.stop()
      }
    }
  }, [entity.state])

  useEffect(() => {
    if (!ref.current) return
    ref.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.material = child.material.clone()
        child.material.transparent = entity.state === EntityState.under_construction
        child.material.opacity =
          entity.state === EntityState.under_construction ? 0.5 : 1
      }
    })
  }, [entity.state])

  const scaleFactor = useMemo(() => {
    if (metaData?.propriety?.scale) {
      return vector3ToArray(metaData?.propriety.scale)
    }
    const boundingBox = new Box3().setFromObject(clone)
    const size = new Vector3()
    boundingBox.getSize(size)
    const scaleX = entity.size.x / size.x
    const scaleZ = entity.size.z / size.z
    const scaleY = (scaleX + scaleZ) / 2 // Calculer scaleY en fonction de scaleX et scaleZ

    return [scaleX, scaleY, scaleZ]
  }, [clone])

  return (
    <primitive
      ref={ref}
      object={clone}
      scale={scaleFactor}
      castShadow={true}
      receiveShadow={true}
      rotation={vector3ToArray(entity.rotation)}
    ></primitive>
  )
}
