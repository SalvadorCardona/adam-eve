import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import React, { useEffect } from "react"
import { usePixiContainer } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"

interface PixiDecoratorPropsInterface {
  container: ContainerChild
  children?: React.ReactNode
}

export const PixiDecorator = ({
  container,
  children,
}: PixiDecoratorPropsInterface) => {
  const pixiContainer = usePixiContainer()
  useEffect(() => {
    pixiContainer.addChild(container)
    return () => {
      pixiContainer.removeChild(container)
    }
  }, [container])

  return <div>{children}</div>
}
