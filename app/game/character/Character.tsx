import { useRef } from "react"
import { Mesh } from "three"
import { useGLTF } from "@react-three/drei" // Import useGLTF

export interface CharacterComponentPropsInterface {}

export default function Character(props: CharacterComponentPropsInterface) {
  const meshRef = useRef<Mesh>()
  const glb = useGLTF("./character-transformed.glb") // Load the GLB model

  return <primitive ref={meshRef} object={glb.scene} scale={[0.5, 0.5, 0.5]} />
}