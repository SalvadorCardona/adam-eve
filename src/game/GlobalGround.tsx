import React from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { Grid } from "@react-three/drei"

export default function GlobalGround() {
  const gameContext = useGameContext()

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
        position={[0, -0.5, 0]}
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
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[100, 100, 1]} />
        <meshStandardMaterial color="#8a643a" roughness={0.5} metalness={0.1} />
      </mesh>
    </>
  )
}
