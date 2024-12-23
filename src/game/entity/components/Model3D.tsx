import EntityInterface from "@/src/game/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Box3, Group, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { vector3ToArray } from "../../3D/Vector"
import { workerEntityMetaData } from "@/src/game/entity/app/worker/WorkerEntity"

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
    if (entity.state && actions[entity.state] && actions) {
      actions[entity.state]?.play()
    }

    return () => {
      if (actions && actions.Running) {
        actions.Running.stop()
      }
    }
  }, [entity.state])

  useEffect(() => {
    clone.traverse((child) => {
      if (entity.ressourceNeeded && child.isMesh) {
        child.material.transparent = true // Activer la transparence
        child.material.opacity = 0.5 // Régler l'opacité (0.0 à 1.0)
      }
    })
  }, [entity.ressourceNeeded])

  // Juste pour corriger le problème du personnage
  if (entity["@type"] === workerEntityMetaData["@type"]) {
    return (
      <primitive
        rotation={[Math.PI / 2, 0, 0]}
        ref={ref}
        object={clone}
        scale={vector3ToArray(entity.scale)}
      />
    )
  }

  const scaleFactor = useMemo(() => {
    const boundingBox = new Box3().setFromObject(clone)
    const size = new Vector3()
    boundingBox.getSize(size)
    const scaleX = entity.size.x / size.x
    const scaleY = entity.size.y / size.y
    return [scaleX, scaleY, scaleX]
  }, [clone])

  const positionZ = useMemo(() => {
    const boundingBox = new Box3().setFromObject(clone)
    const size = new Vector3()
    boundingBox.getSize(size)
    return (size.z / 2) * scaleFactor[2]
  }, [clone, scaleFactor])

  return (
    <primitive
      rotation={[Math.PI / 2, 0, 0]}
      ref={ref}
      object={clone}
      scale={scaleFactor}
      position-z={positionZ}
    />
  )
}
