import React from "react"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"
import useGameContext from "@/src/UI/provider/useGameContext"
import { onClickMapUserActionMetadata } from "@/src/game/actionUser/app/OnClickMapUserActionMetadata"
import { Grid } from "@react-three/drei"

export default function Ground() {
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
          cellColor={"white"}
          args={[1000, 1000]}
          cellSize={0.5}
          cellThickness={1}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      <mesh
        onClick={clickToMap}
        onPointerMove={(event) => {
          gameContext.game.userControl.mousePosition = event.point
        }}
        position={[0, -0.1, 0]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry args={[50, 50]} />
      </mesh>
    </>
  )
}
