import React from "react"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"
import useGameContext from "@/src/UI/provider/useGameContext"
import { onClickMapUserActionMetadata } from "@/src/game/actionUser/app/OnClickMapUserActionMetadata"

export default function Ground() {
  const gameContext = useGameContext()
  const clickToMap = (e: ThreeEvent<MouseEvent>) => {
    if (!e) return
    onClickMapUserActionMetadata.onCall &&
      onClickMapUserActionMetadata.onCall({ game: gameContext.game })
  }

  return (
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
  )
}
