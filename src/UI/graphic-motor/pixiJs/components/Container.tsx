import { ContainerOptions } from "pixi.js/lib/scene/container/Container"
import { Container as BaseContainer } from "pixi.js"
import React, { useEffect, useRef } from "react"
import { PixiContainerProvider } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"
import { usePixiInstance } from "@/src/UI/graphic-motor/pixiJs/hook/useTexture"

interface ContainerPropsInterface {}

interface ContainerPropsInterface {
  options?: ContainerOptions
  children?: React.ReactNode
  position?: Vector2Interface
  scale?: Vector2Interface
}

export const Container = ({
  children,
  options,
  position,
  scale,
}: ContainerPropsInterface) => {
  const containerRef = useRef(new BaseContainer(options))
  useEffect(() => {
    if (position) {
      containerRef.current.x = position.x
      containerRef.current.y = position.y
      if (scale && scale.x === -1) {
        // containerRef.current.scale.x = scale.x
        // containerRef.current.x = position.x + options?.width / 2
      }
    }
  }, [position, scale])
  //
  // useEffect(() => {
  //   console.log(scale)
  //   if (scale && scale.x === -1) {
  //     containerRef.current.scale.x = scale.x
  //     // containerRef.current.scale.y = 1
  //   }
  // }, [scale])

  usePixiInstance({ container: containerRef.current })

  return (
    <PixiContainerProvider currentContainer={containerRef.current}>
      {children}
    </PixiContainerProvider>
  )
}
