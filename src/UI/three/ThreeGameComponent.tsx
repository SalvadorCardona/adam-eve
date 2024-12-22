import { Canvas } from "@react-three/fiber"
import { Environment, Grid } from "@react-three/drei"
import { GameProvider } from "@/src/UI/provider/GameProvider"
import mockGame from "@/src/game/game/app/mockGame"
import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"
import { ControlKeyboard } from "@/src/UI/ControlKeyboard"
import Ground from "@/src/game/entity/app/ground/Ground"
import { MouseCursor } from "@/src/UI/MouseCursor/MouseCursor"

export default function ThreeGameComponent() {
  return (
    <main className={"h-screen overflow-hidden"}>
      <GameProvider game={mockGame}>
        <Canvas
          shadows
          camera={{
            fov: 50,
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
      <ControlKeyboard></ControlKeyboard>
      {/*<Stats showPanel={1} className={""} />*/}
      {gameContext.game.userControl.showGrid && (
        <Grid
          cellColor={"white"}
          args={[1000, 1000]}
          cellSize={0.5}
          cellThickness={1}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      <Environment preset="dawn" background blur={0.5} />
      <Ground></Ground>
    </>
  )
}
