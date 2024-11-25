"use client"
import { CameraProps, Canvas } from "@react-three/fiber"
import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { Vector3 } from "three"
import Ground from "@/app/game/ground/Ground"
import { Character2 } from "@/app/game/character/Character2"

export interface GameComponentPropsInterface {}

export default function GameComponent(props: GameComponentPropsInterface) {
  const setupCamera: CameraProps = {
    position: new Vector3(0, 10, 2),
    fov: 75,
  }
  return (
    <Canvas shadows camera={setupCamera}>
      <Child></Child>
    </Canvas>
  )
}

function Child(props: GameComponentPropsInterface) {
  return (
    <>
      <Grid cellColor={"white"} args={[100, 100]} />
      <Environment preset="dawn" background blur={0.5} />
      <OrbitControls makeDefault />
      <Ground></Ground>
      <Character2></Character2>
    </>
  )
}
