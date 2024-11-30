"use client"
import { CameraProps, Canvas } from "@react-three/fiber"
import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { Vector3 } from "three"
import { GameProvider } from "@/app/game/provider/GameProvider"
import mockGame from "@/app/game/mock/mockGame"

export interface GameComponentPropsInterface {
}


export default function GameComponent(props: GameComponentPropsInterface) {
  const setupCamera: CameraProps = {
    position: new Vector3(0, 10, 2),
    fov: 75
  }
  return (
    <Canvas shadows camera={setupCamera}>
      <Child></Child>
    </Canvas>
  )
}

function Child(props: GameComponentPropsInterface) {
  return (
    <GameProvider game={mockGame}>
      <Grid cellColor={"white"} args={[100, 100]} />
      <Environment preset="dawn" background blur={0.5} />
      <OrbitControls makeDefault />
      {/*<OrthographicCamera makeDefault></OrthographicCamera>*/}
      {/*<Ground></Ground>*/}
    </GameProvider>
  )
}
