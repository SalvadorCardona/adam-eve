import React, { useEffect, useState } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import {
  createVector2,
  Vector2Interface,
  vector3ToVector2,
} from "@/src/utils/3Dmath/Vector"
import { PixiProvider } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiProvider"
import { ApplicationOptions } from "pixi.js/lib/app/Application"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { SelectOnMap } from "@/src/UI/graphic-motor/pixiJs/SelectOnMap"
import { EntitiesLoopPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntitiesLoopPixiJs"
import { PixiGrid } from "@/src/UI/graphic-motor/pixiJs/PixiGrid"
import { ControlKeyboard } from "@/src/UI/ControlKeyboard"
import { useGameFrame } from "@/src/UI/hook/useGameFrame"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"

export const PixijsAppComponent = () => {
  const gameContext = useGameContext()
  const [size, setSize] = useState<Vector2Interface>({
    x: window.innerWidth,
    y: window.innerHeight,
  })

  const game = gameContext.game

  useEffect(() => {
    const handleResize = () =>
      setSize({
        x: window.innerWidth,
        y: window.innerHeight,
      })

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const options: Partial<ApplicationOptions> = {
    width: size.x,
    height: size.y,
    background: 0x1099bb,
  }

  return (
    <>
      <PixiProvider options={options}>
        <PixiGrid size={size}></PixiGrid>
        <Container>
          <EntitiesLoopPixiJs></EntitiesLoopPixiJs>
        </Container>
        <SelectOnMap></SelectOnMap>
        <ControlKeyboard></ControlKeyboard>
        <Camera></Camera>
      </PixiProvider>
    </>
  )
}

interface ElemPropsInterface {}

const Camera = () => {
  const [camera, setCamera] = useState<Vector2Interface>(createVector2())
  const pixi = usePixiApp()
  const stage = pixi.app?.stage as ContainerChild

  useGameFrame((game) => {
    const newCamera = vector3ToVector2(game.camera.position)
    if (camera !== newCamera) {
      setCamera(newCamera)
    }
  })

  useEffect(() => {
    stage.position = camera
  }, [camera])

  return <></>
}
