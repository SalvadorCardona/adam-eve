import { ContainerOptions } from "pixi.js/lib/scene/container/Container"
import { Container as BaseContainer } from "pixi.js"
import React, { useEffect, useMemo, useRef } from "react"
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
  const containerRef = useRef(new BaseContainer(options))

  useEffect(() => {
    if (position) {
      containerRef.current.x = position.x
      containerRef.current.y = position.y
    }
  }, [position])

  return (
    <PixiContainerProvider currentContainer={containerRef.current}>
      <PixiDecorator container={containerRef.current}>{children}</PixiDecorator>
    </PixiContainerProvider>
  )
}