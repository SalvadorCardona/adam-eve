import { ContainerOptions } from "pixi.js/lib/scene/container/Container"
import { Container as BaseContainer } from "pixi.js"
import React, { useEffect, useMemo } from "react"
import { PixiDecorator } from "@/src/UI/graphic-motor/pixiJs/components/PixiDecorator"
import { PixiContainerProvider } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import { Vector2Interface } from "@/src/utils/3Dmath/Vector"

interface ContainerPropsInterface {}

interface ContainerPropsInterface {
  options?: ContainerOptions
  children?: React.ReactNode
  position?: Vector2Interface
}

export const Container = ({
  children,
  options,
  position,
}: ContainerPropsInterface) => {
  const container = useMemo(() => {
    return new BaseContainer(options)
  }, [options])

  useEffect(() => {
    if (position) {
      container.x = position.x
      container.y = position.y
    }
  }, [position])

  return (
    <PixiContainerProvider currentContainer={container}>
      <PixiDecorator container={container}>{children}</PixiDecorator>
    </PixiContainerProvider>
  )
}
