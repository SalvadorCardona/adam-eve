import React from "react"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"
import useGameContext from "@/src/UI/provider/useGameContext"
import { onClickMapUserActionMetadata } from "@/src/game/actionUser/app/OnClickMapUserActionMetadata"
import { Grid } from "@react-three/drei"

export default function GlobalGround() {
  const gameContext = useGameContext()
  const clickToMap = (e: ThreeEvent<MouseEvent>) => {
    if (!e) return
    onClickMapUserActionMetadata.onCall &&
      onClickMapUserActionMetadata.onCall({ game: gameContext.game })
  }

  return (
    <>
      {gameContext.game.userControl.showGrid && (
        <Grid
          cellColor={"#5d7033"}
          sectionColor={"#5d7033"}
          args={[1000, 1000]}
          position-y={0.01}
          cellSize={0.5}
          cellThickness={1}
        />
      )}
      <mesh
        receiveShadow={true}
        onClick={clickToMap}
        onPointerMove={(event) => {
          gameContext.game.userControl.mousePosition = event.point
        }}
        position={[0, -0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[100, 100, 128, 128]} />

        <meshStandardMaterial
          color={"#457083"} // Blue for water, green otherwise
          transparent={true} // Make it transparent if it's water
          opacity={0.8} // Set opacity for water
          roughness={0.7} // Higher roughness for a more natural texture
          metalness={0.0} // No metalness for a matte finish
        />
      </mesh>
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[100, 100, 1]} />
        <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
      </mesh>
    </>
  )
}
