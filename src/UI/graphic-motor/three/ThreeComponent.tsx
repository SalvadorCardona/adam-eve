import useGameContext from "@/src/UI/provider/useGameContext"
import { Canvas } from "@react-three/fiber"
import { WebGLRenderer } from "three"
import { EntitiesLoopThreeJs } from "@/src/UI/graphic-motor/three/EntitiesLoopThreeJs"
import { ControlKeyboard } from "@/src/UI/ControlKeyboard"
import { PerspectiveCamera, Stats } from "@react-three/drei"
import { CreateBuilding } from "@/src/game/actionUser/app/CreateBuildingUserAction/CreateBuilding"
import { SelectOnMap } from "@/src/game/actionUser/app/SelectUserAction/SelectOnMap"
import { vector3ToArray } from "@/src/utils/3Dmath/Vector"
import GlobalGround from "@/src/game/GlobalGround"
import React from "react"

export function ThreeComponent() {
  const gameContext = useGameContext()
  return (
    <Canvas
      id={"game"}
      shadows
      camera={{
        fov: 100,
      }}
      gl={(canvas) => new WebGLRenderer({ canvas })}
    >
      <EntitiesLoopThreeJs />
      <ControlKeyboard></ControlKeyboard>
      <Stats showPanel={0} className={""} />
      <Lights></Lights>
      {/*<OrbitControls*/}
      {/*  rotation={[-0.3, -0.05, -0.02]}*/}
      {/*  position={[-0.4, 3.5, 3.5]}*/}
      {/*></OrbitControls>*/}
      <CreateBuilding></CreateBuilding>
      <SelectOnMap></SelectOnMap>
      <PerspectiveCamera
        makeDefault={true}
        fov={gameContext.game.camera.fov}
        position={vector3ToArray(gameContext.game.camera.position)}
        rotation={vector3ToArray(gameContext.game.camera.rotation)}
      />
      <GlobalGround></GlobalGround>
    </Canvas>
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
