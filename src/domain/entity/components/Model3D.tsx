import EntityInterface from "@/src/domain/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { vector3ToArray } from "@/src/domain/3D/Vector"
import { getMetaData } from "@/src/game/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Group } from "three"
import { SkeletonUtils } from "three-stdlib"

interface Model3DPropsInterface {
  entity: EntityInterface
}

export const Model3D = ({ entity }: Model3DPropsInterface) => {
  const metaData = getMetaData(entity)
  if (!metaData.asset?.model3d) {
    return
  }

  const glb = useGLTF(metaData.asset.model3d)
  const ref = useRef<Group>()
  const clone = useMemo(() => SkeletonUtils.clone(glb.scene), [glb.scene])
  const { actions } = useAnimations(glb.animations, ref)

  useEffect(() => {
    if (actions && actions.Running) {
      actions.Running.play()
    }
    return () => {
      if (actions && actions.Running) {
        actions.Running.stop()
      }
    }
  }, [actions])

  return <primitive ref={ref} object={clone} scale={vector3ToArray(entity.scale)} />
}
