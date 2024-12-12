import { Canvas } from "@react-three/fiber"
import { Environment, Grid, OrbitControls } from "@react-three/drei"
import { GameProvider } from "@/src/game/provider/GameProvider"
import mockGame from "@/src/game/mock/mockGame"
import Ground from "@/src/game/entity/ground/Ground"
import useGameContext from "@/src/game/provider/useGameContext"
import { EntityDecorator } from "@/src/domain/entity/EntityDecorator"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"

export interface GameComponentPropsInterface {}

export default function ThreeGameComponent(props: GameComponentPropsInterface) {
  return (
    <div className={"h-screen"}>
      <GameProvider game={mockGame}>
        <Canvas shadows camera={{ position: [0, 10, 2], fov: 75 }}>
          <Child></Child>
        </Canvas>
        <InterfaceComponent></InterfaceComponent>
      </GameProvider>
    </div>
  )
}

function Child(props: GameComponentPropsInterface) {
  const gameContext = useGameContext()

  return (
    <>
      {Object.values(gameContext.game.entities).map((entity) => {
        return (
          <EntityDecorator
            key={"decorator" + entity["@id"]}
            entity={entity}
          ></EntityDecorator>
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
