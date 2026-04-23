import React from "react"
import { ContainerOptions } from "pixi.js"
import { Vector2Interface } from "@/packages/math/vector"

interface ContainerPropsInterface {
  options?: ContainerOptions
  children?: React.ReactNode
  position?: Vector2Interface
  scale?: Vector2Interface
  zIndex?: number
}

export const Container = ({
  children,
  options,
  position,
  scale,
  zIndex,
}: ContainerPropsInterface) => {
  // Preserve the mirrored-placement quirk from the previous wrapper: when
  // horizontal scale is flipped, offset x by the container width so the
  // mirrored sprite still lands at the declared position.
  const x =
    position && scale?.x === -1 && options?.width
      ? position.x + (options.width as number)
      : position?.x

  return (
    <pixiContainer
      x={x}
      y={position?.y}
      scale={scale}
      zIndex={zIndex ?? options?.zIndex}
      width={options?.width as number | undefined}
      height={options?.height as number | undefined}
    >
      {children}
    </pixiContainer>
  )
}
