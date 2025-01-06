import EntityInterface, { EntityState } from "@/src/game/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Box3, Group, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/WorkerEntity"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"

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
    if (!metaData.asset?.animationMapper || !entity?.state) return
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
    const boundingBox = new Box3().setFromObject(clone)
    const size = new Vector3()
    boundingBox.getSize(size)
    const scaleX = entity.size.x / size.x
    const scaleY = entity.size.y / size.y
    const scaleZ = entity.size.z / size.z
    const uniformScale = Math.min(scaleX, scaleY, scaleZ)
    return [uniformScale, uniformScale, uniformScale]
  }, [clone])

  const positionY = useMemo(() => {
    const boundingBox = new Box3().setFromObject(clone)
    const size = new Vector3()
    boundingBox.getSize(size)
    return (size.y / 2) * scaleFactor[2]
  }, [clone, scaleFactor])

  if (entity["@type"] === workerEntityMetaData["@type"]) {
    return (
      <primitive
        ref={ref}
        object={clone}
        scale={[0.1, 0.1, 0.1]}
        castShadow={true}
        receiveShadow={true}
        rotation={vector3ToArray(entity.rotation)}
      />
    )
  }

  return (
    <primitive
      position-y={positionY}
      ref={ref}
      object={clone}
      scale={scaleFactor}
      castShadow={true}
      receiveShadow={true}
      rotation={vector3ToArray(entity.rotation)}
    ></primitive>
  )
}
