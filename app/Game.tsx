"use client"
import { CameraProps, Canvas } from "@react-three/fiber"
import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { Vector3 } from "three"
import { GameProvider } from "@/app/game/provider/GameProvider"
import mockGame from "@/app/game/mock/mockGame"
import Ground from "@/app/game/entity/ground/Ground"
import useGameContext from "@/app/game/provider/useGameContext"
import { EntityDecorator } from "@/app/game/entity/EntityDecorator"

export interface GameComponentPropsInterface {}

export default function GameComponent(props: GameComponentPropsInterface) {
  const setupCamera: CameraProps = {
    position: new Vector3(0, 10, 2),
    fov: 75,
  }
  return (
    <GameProvider game={mockGame}>
      <Canvas shadows camera={setupCamera}>
        <Child></Child>
      </Canvas>
      <div>je suis 'linterface</div>
    </GameProvider>
  )
}

function Child(props: GameComponentPropsInterface) {
  const gameContext = useGameContext()
  return (
    <>
      {Object.values(gameContext.game.entities).map((entity) => {
        return (
          <EntityDecorator key={entity["@id"]} entity={entity}></EntityDecorator>
        )
      })}
      <Grid cellColor={"white"} args={[100, 100]} />
      <Environment preset="dawn" background blur={0.5} />
      <OrbitControls makeDefault />
      {/*<OrthographicCamera makeDefault></OrthographicCamera>*/}
      <Ground></Ground>
    </>
  )
}
