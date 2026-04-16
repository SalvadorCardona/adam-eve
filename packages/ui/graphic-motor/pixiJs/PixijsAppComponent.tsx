import React, { useEffect, useState } from "react"
import { Vector2Interface } from "@/packages/math/vector"
import { PixiProvider } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/PixiProvider"
import { ApplicationOptions } from "pixi.js/lib/app/Application"
import { Container } from "@/packages/ui/graphic-motor/pixiJs/components/Container"
import { SelectOnMap } from "@/packages/ui/graphic-motor/pixiJs/SelectOnMap"
import { EntitiesLoopPixiJs } from "@/packages/ui/graphic-motor/pixiJs/EntitiesLoopPixiJs"
import { PixiGrid } from "@/packages/ui/graphic-motor/pixiJs/PixiGrid"
import { ControlKeyboard } from "@/packages/ui/ControlKeyboard"
import { Camera } from "@/packages/ui/graphic-motor/pixiJs/Camera"
import { CreateEntityComponent } from "@/app/ationUser/CreateEntityUserAction/CreateEntityComponent"
import { BackGroundGame } from "@/packages/ui/graphic-motor/pixiJs/BackGroundGame"

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
      <BackGroundGame size={size}></BackGroundGame>
    </PixiProvider>
  )
}
