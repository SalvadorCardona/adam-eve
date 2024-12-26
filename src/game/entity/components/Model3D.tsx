import EntityInterface from "@/src/game/entity/EntityInterface"
import { useAnimations, useGLTF } from "@react-three/drei"
import { getMetaData } from "@/src/game/game/app/configGame"
import React, { useEffect, useMemo, useRef } from "react"
import { Box3, Group, Vector3 } from "three"
import { SkeletonUtils } from "three-stdlib"
import { vector3ToArray } from "../../3D/Vector"
import { workerEntityMetaData } from "@/src/game/entity/app/worker/WorkerEntity"
import { ShaderMaterial } from "three/src/Three"
import { imgLoader } from "@/src/game/3D/textureHelper"
import grassTexturesrc from "@/src/game/entity/app/road/grassTexture.png"

function fragmentShader() {
  return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
	 
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 0.5);
      }
  `
}

interface Model3DPropsInterface {
  entity: EntityInterface
}

class Color {
  constructor(number: number) {}
}

const grassTexture = imgLoader(grassTexturesrc, "road")

export const Model3D = ({ entity }: Model3DPropsInterface) => {
  const metaData = getMetaData(entity)
  if (!metaData.asset?.model3d) {
    return
  }

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          colorA: { value: new Color(0xff0000) },
          colorB: { value: new Color(0x0000ff) },
        },
        vertexShader: `
      varying vec3 vUv;
      void main() {
        vUv = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: fragmentShader(),
      }),
    [],
  )

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
  //
  // useEffect(() => {
  //   ref.current.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material.transparent = !entity.isBuild
  //       child.material.opacity = entity.isBuild ? 1 : 0.5
  //     }
  //   })
  // }, [entity.isBuild])

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
      material={shaderMaterial}
      ref={ref}
      object={clone}
      scale={scaleFactor}
      position-z={positionZ}
    ></primitive>
  )
}
