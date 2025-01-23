import React, { useEffect, useState } from "react"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { PixiProvider } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiProvider"
import { ApplicationOptions } from "pixi.js/lib/app/Application"
import { Container } from "@/src/UI/graphic-motor/pixiJs/components/Container"
import { SelectOnMap } from "@/src/UI/graphic-motor/pixiJs/SelectOnMap"
import { EntitiesLoopPixiJs } from "@/src/UI/graphic-motor/pixiJs/EntitiesLoopPixiJs"
import { PixiGrid } from "@/src/UI/graphic-motor/pixiJs/PixiGrid"
import { ControlKeyboard } from "@/src/UI/ControlKeyboard"
import { Sprite } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { Camera } from "@/src/UI/graphic-motor/pixiJs/Camera"
import { CreateEntityComponent } from "@/src/game/actionUser/app/CreateEntityUserAction/CreateEntityComponent"
import { assetList } from "@/src/app/assetList"
import { Ticker } from "pixi.js"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"

export const PixijsAppComponent = () => {
  const [size, setSize] = useState<Vector2Interface>({
    x: window.innerWidth,
    y: window.innerHeight,
  })

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
  }

  return (
    <PixiProvider options={options}>
      <SelectOnMap></SelectOnMap>
      <CreateEntityComponent></CreateEntityComponent>
      <PixiGrid size={size}></PixiGrid>
      <Container>
        <EntitiesLoopPixiJs></EntitiesLoopPixiJs>
      </Container>
      <ControlKeyboard></ControlKeyboard>
      <Camera></Camera>
      <Sprite
        options={{ ...options, zIndex: -999 }}
        image={assetList.water}
        isTilling={true}
        animation={(e: Ticker, item: ContainerChild) => {
          const deform = 0.5
          const speed = 0.001
          // const scaleFactor = (1 - deform * Math.abs(Math.cos(e.lastTime * speed))) / 1.9
          const scaleFactor = Math.cos(e.lastTime * speed) * deform

          // item.position.x += scaleFactor
          // item.position.y += scaleFactor
          // item.position.x += scaleFactor
        }}
      ></Sprite>
    </PixiProvider>
  )
}
