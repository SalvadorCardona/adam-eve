"use client"
import React from "react"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"
import { imgLoader } from "@/app/game/util/textureHelper"
import imageSource from "./grass.png"

const image = imgLoader(imageSource.src, "un")

export interface GroundPropsInterface {}

export default function Ground() {
  // const line = 50
  // const count = line * line
  // const halfSize = line / 2
  // const temp = new Object3D()
  // const instancedMeshRef = useRef<InstancedMesh>() as MutableRefObject<InstancedMesh>
  // const grass = useLoader(TextureLoader, "/grass2.png")
  // const gameContext = useGameContext()
  //
  // useEffect(() => {
  //   let localCount = 0
  //   // Set positions
  //   for (let x = -halfSize; x < halfSize; x++) {
  //     for (let y = -halfSize; y < halfSize; y++) {
  //       temp.position.set(x, -0.5, y)
  //       temp.updateMatrix()
  //       instancedMeshRef.current.setMatrixAt(localCount, temp.matrix)
  //       localCount++
  //     }
  //   }
  //
  //   // Update the instance
  //   instancedMeshRef.current.instanceMatrix.needsUpdate = true
  // }, [])

  const test = (e: ThreeEvent<MouseEvent>) => {
    console.log(e.point)
    console.log(e.pointer)
  }
  return (
    <mesh onClick={test} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial attach="material" transparent={true} map={image} />
    </mesh>
  )
}
