"use client"
import { Canvas } from "@react-three/fiber"
import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { GameProvider } from "@/app/game/provider/GameProvider"
import mockGame from "@/app/game/mock/mockGame"
import Ground from "@/app/game/entity/ground/Ground"
import useGameContext from "@/app/game/provider/useGameContext"
import { EntityDecorator } from "@/app/domain/entity/EntityDecorator"
import { InterfaceComponent } from "@/app/interface/InterfaceComponent"

export interface GameComponentPropsInterface {}

export default function GameComponent(props: GameComponentPropsInterface) {
  return (
    <GameProvider game={mockGame}>
      <Canvas shadows camera={{ position: [0, 10, 2], fov: 75 }}>
        <Child></Child>
      </Canvas>
      <InterfaceComponent></InterfaceComponent>
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
