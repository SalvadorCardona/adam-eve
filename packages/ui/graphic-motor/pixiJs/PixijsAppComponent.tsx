import React, { useEffect, useMemo, useState } from "react"
import { Vector2Interface } from "@/packages/math/vector"
import { PixiProvider } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/PixiProvider"
import { ApplicationOptions } from "pixi.js"
import { Container } from "@/packages/ui/graphic-motor/pixiJs/components/Container"
import { SelectOnMap } from "@/packages/ui/graphic-motor/pixiJs/SelectOnMap"
import { EntitiesLoopPixiJs } from "@/packages/ui/graphic-motor/pixiJs/EntitiesLoopPixiJs"
import { GroundTilesLayer } from "@/packages/ui/graphic-motor/pixiJs/GroundTilesLayer"
import { ControlKeyboard } from "@/packages/ui/ControlKeyboard"
import { Camera } from "@/packages/ui/graphic-motor/pixiJs/Camera"
import { CreateEntityComponent } from "@/app/actionUser/CreateEntityUserAction/CreateEntityComponent"
import { PlayerBuildPreviewComponent } from "@/app/entity/character/player/PlayerBuildPreviewComponent"
import { BackGroundGame } from "@/packages/ui/graphic-motor/pixiJs/BackGroundGame"
import { FogOfWar } from "@/packages/ui/graphic-motor/pixiJs/FogOfWar"

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

  const options = useMemo<Partial<ApplicationOptions>>(
    () => ({
      width: size.x,
      height: size.y,
    }),
    [size.x, size.y],
  )

  return (
    <PixiProvider options={options}>
      <SelectOnMap></SelectOnMap>
      <CreateEntityComponent></CreateEntityComponent>
      <PlayerBuildPreviewComponent></PlayerBuildPreviewComponent>
      <Container>
        <GroundTilesLayer />
        <Container sortableChildren>
          <EntitiesLoopPixiJs></EntitiesLoopPixiJs>
        </Container>
      </Container>
      <FogOfWar />

      <ControlKeyboard></ControlKeyboard>
      <Camera></Camera>
      <BackGroundGame size={size}></BackGroundGame>
    </PixiProvider>
  )
}
