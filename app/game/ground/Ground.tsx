"use client"
import React, { MutableRefObject, useEffect, useRef } from "react"
import { InstancedMesh, Object3D, TextureLoader } from "three"
import { useLoader } from "@react-three/fiber"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"

export interface GroundPropsInterface {}

export default function Ground() {
  const line = 300
  const count = line * line
  const halfSize = line / 2
  const temp = new Object3D()
  const instancedMeshRef = useRef<InstancedMesh>() as MutableRefObject<InstancedMesh>
  const grass = useLoader(TextureLoader, "/grass2.png")

  useEffect(() => {
    let localCount = 0
    // Set positions
    for (let x = -halfSize; x < halfSize; x++) {
      for (let y = -halfSize; y < halfSize; y++) {
        temp.position.set(x, -0.5, y)
        temp.updateMatrix()
        instancedMeshRef.current.setMatrixAt(localCount, temp.matrix)
        localCount++
      }
    }

    // Update the instance
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  const test = (e: ThreeEvent<MouseEvent>) => {
    console.log(e)
    console.log(e.object)
  }
  return (
    <instancedMesh onClick={test} ref={instancedMeshRef} args={[null, null, count]}>
      <boxGeometry></boxGeometry>
      <meshStandardMaterial map={grass} />
    </instancedMesh>
  )
}
