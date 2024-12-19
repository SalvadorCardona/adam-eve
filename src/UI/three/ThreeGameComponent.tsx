import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { GameProvider } from "@/src/UI/provider/GameProvider"
import mockGame from "@/src/game/game/app/mockGame"
import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"
import { Control } from "@/src/UI/Control"
import Ground from "@/src/game/entity/app/ground/Ground"
import { MouseCursor } from "@/src/UI/MouseCursor/MouseCursor"

export default function ThreeGameComponent() {
  return (
    <main className={"h-screen overflow-hidden"}>
      <GameProvider game={mockGame}>
        <Canvas
          shadows
          camera={{
            position: [0, 10, 10],
            fov: 50,
            rotation: [-Math.PI / 4, 0, 0],
          }}
        >
          <Child></Child>
        </Canvas>
        <InterfaceComponent></InterfaceComponent>
        <MouseCursor></MouseCursor>
      </GameProvider>
    </main>
  )
}

function Child() {
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
      <Control></Control>
      {/*<Stats showPanel={1} className={""} />*/}
      {/*<Grid cellColor={"white"} args={[1000, 1000]} />*/}
      <Environment preset="dawn" background blur={0.5} />
      <Ground></Ground>
    </>
  )
}
