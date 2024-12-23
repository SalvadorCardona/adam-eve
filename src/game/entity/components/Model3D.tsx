import EntityInterface from "@/src/game/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Box3, Group, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { characterEntityMetaData } from "@/src/game/entity/app/character/CharacterEntity"
import { vector3ToArray } from "../../3D/Vector"

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
      console.log(actions)
      actions[entity.state]?.play()
    }

    return () => {
      if (actions && actions.Running) {
        actions.Running.stop()
      }
    }
  }, [actions])

  if (entity["@type"] === characterEntityMetaData["@type"]) {
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
