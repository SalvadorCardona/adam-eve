"use client"
import React from "react"
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events"
import { imgLoader } from "@/app/domain/3D/textureHelper"
import imageSource from "./grass2.png"
import useGameContext from "@/app/game/provider/useGameContext"
import { RepeatWrapping } from "three"
import { ActionControllerList, controller } from "@/app/domain/controller/controller"

const image = imgLoader(imageSource.src, "un")

export interface GroundPropsInterface {}

export default function Ground() {
  const gameContext = useGameContext()

  const clickToMap = (e: ThreeEvent<MouseEvent>) => {
    if (!e) return

    controller({
      positon: e.point,
      action: ActionControllerList.ClickOnMap,
    })
  }

  image.wrapS = image.wrapT = RepeatWrapping
  image.repeat.set(10, 10)

  return (
    <mesh
      onClick={clickToMap}
      position={[0, -0.1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial attach="material" map={image} />
    </mesh>
  )
}
