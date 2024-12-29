import { PerspectiveCamera } from "@react-three/drei"
import { GameProvider } from "@/src/UI/provider/GameProvider"
import mockGame from "@/src/game/game/app/mockGame"
import useGameContext from "@/src/UI/provider/useGameContext"
import { EntityDecorator } from "@/src/game/entity/EntityDecorator"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"
import { ControlKeyboard } from "@/src/UI/ControlKeyboard"
import Ground from "@/src/game/entity/ground/Ground"
import { MouseCursor } from "@/src/UI/MouseCursor/MouseCursor"
import { vector3ToArray } from "@/src/game/3D/Vector"
import { Canvas } from "@react-three/fiber"
import GameInterface from "@/src/game/game/GameInterface"

export default function ThreeGameComponent({ game }: { game?: GameInterface }) {
  return (
    <main className={"h-screen overflow-hidden"}>
      <GameProvider game={game ?? mockGame}>
        <Canvas
          shadows
          camera={{
            fov: 100,
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
      <Lights></Lights>

      <PerspectiveCamera
        makeDefault
        fov={gameContext.game.camera.fov}
        position={vector3ToArray(gameContext.game.camera.position)}
        rotation={vector3ToArray(gameContext.game.camera.rotation)}
      />

      {/*<Environment preset="dawn" background blur={0.5} />*/}
      <Ground></Ground>
    </>
  )
}

function Lights() {
  // const ambientCtl = useControls("Ambient Light", {
  //   visible: true,
  //   intensity: {
  //     value: 2,
  //     min: 0,
  //     max: 2,
  //     step: 0.1,
  //   },
  // })
  //
  // const directionalCtl = useControls("Directional Light", {
  //   visible: true,
  //   position: {
  //     x: 3.3,
  //     y: 1.0,
  //     z: 10,
  //   },
  //   castShadow: true,
  // })

  return (
    <>
      <ambientLight visible={true} intensity={2} />
      <directionalLight
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-left={-10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[1024, 1024]}
        visible={true}
        position={[3.3, 1.0, 10]}
        castShadow={true}
      ></directionalLight>
    </>
  )
}
