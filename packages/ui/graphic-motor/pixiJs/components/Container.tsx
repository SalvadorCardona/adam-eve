import React from "react"
import { ContainerOptions, FederatedPointerEvent } from "pixi.js"
import { Vector2Interface } from "@/packages/math/vector"

interface ContainerPropsInterface {
  options?: ContainerOptions
  children?: React.ReactNode
  position?: Vector2Interface
  scale?: Vector2Interface
  zIndex?: number
  sortableChildren?: boolean
  cullable?: boolean
  cullableChildren?: boolean
  eventMode?: ContainerOptions["eventMode"]
  cursor?: ContainerOptions["cursor"]
  onPointerTap?: (e: FederatedPointerEvent) => void
  onPointerOver?: (e: FederatedPointerEvent) => void
  onPointerOut?: (e: FederatedPointerEvent) => void
}

export const Container = ({
  children,
  options,
  position,
  scale,
  zIndex,
  sortableChildren,
  cullable,
  cullableChildren,
  eventMode,
  cursor,
  onPointerTap,
  onPointerOver,
  onPointerOut,
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
      sortableChildren={sortableChildren}
      cullable={cullable}
      cullableChildren={cullableChildren}
      width={options?.width as number | undefined}
      height={options?.height as number | undefined}
      eventMode={eventMode}
      cursor={cursor}
      onPointerTap={onPointerTap}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {children}
    </pixiContainer>
  )
}
