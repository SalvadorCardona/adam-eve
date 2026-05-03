import React, { useEffect, useRef, useState } from "react"
import { createVector2, Vector2Interface } from "@/packages/math/vector"
import { usePixiApp } from "@/packages/ui/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { Graphics } from "@/packages/ui/graphic-motor/pixiJs/components/Graphics"
import { FederatedPointerEvent, Graphics as BaseGraphic, Rectangle } from "pixi.js"
import useGameContext from "@/packages/ui/provider/useGameContext"
import { updateGame } from "@/packages/game/game/updateGame"
import { diviseVector2D } from "@/packages/math/diviseVector"
import { createEntityUserActionMetadata } from "@/app/actionUser/CreateEntityUserAction/createEntityUserActionMetadata"
import { removeBuildingUserActionMetadata } from "@/app/actionUser/RemoveBuildingUserAction/removeBuildingUserActionMetadata"

export const SelectOnMap = () => {
  const app = usePixiApp().app
  const game = useGameContext().game
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(false)

  const [startPosition, setStartPosition] =
    useState<Vector2Interface>(createVector2())
  const [currentPosition, setCurrentPosition] =
    useState<Vector2Interface>(createVector2())
  const startPositionRef = useRef<Vector2Interface>(createVector2())

  useEffect(() => {
    if (!app || !app.stage || !app.screen) return

    const toLocal = (event: FederatedPointerEvent) => {
      const localPosition = app.stage.toLocal(event.global)
      return { x: localPosition.x, y: localPosition.y }
    }

    const handlePointerDown = (event: FederatedPointerEvent) => {
      const position = toLocal(event)
      startPositionRef.current = position
      setStartPosition(position)
      setCurrentPosition(position)
      isDraggingRef.current = true
      setIsDragging(true)
    }

    const handlePointerMove = (event: FederatedPointerEvent) => {
      const position = toLocal(event)
      if (isDraggingRef.current) setCurrentPosition(position)
      game.mouseState.position = position
      updateGame(game, game.mouseState)
    }

    const handlePointerUp = (event: FederatedPointerEvent) => {
      if (!isDraggingRef.current) return
      const endPosition = toLocal(event)

      game.mouseState.startPosition = startPositionRef.current
      game.mouseState.endPosition = endPosition

      // Entity clicks are handled per-entity (see EntityDecoratorPixiJs).
      // If a click reaches the stage, it missed every selectable entity,
      // so we deselect any current selection (unless we're in a user action).
      if (!game.userControl.currentAction && game.userControl.entitySelected) {
        game.userControl.entitySelected = undefined
        updateGame(game, game.userControl)
      }

      createEntityUserActionMetadata.onApply({ game })
      removeBuildingUserActionMetadata.onApply({ game })

      isDraggingRef.current = false
      setIsDragging(false)
    }

    const handlePointerCancel = () => {
      isDraggingRef.current = false
      setIsDragging(false)
    }

    app.stage.eventMode = "static"

    const updateHitArea = () => {
      if (!app.stage || app.stage.destroyed || !app.screen) return
      app.stage.hitArea = new Rectangle(
        -app.stage.position.x,
        -app.stage.position.y,
        app.screen.width,
        app.screen.height,
      )
    }

    updateHitArea()
    app.ticker.add(updateHitArea)

    app.stage.on("pointerdown", handlePointerDown)
    app.stage.on("pointermove", handlePointerMove)
    app.stage.on("pointerup", handlePointerUp)
    app.stage.on("pointerupoutside", handlePointerUp)
    app.stage.on("pointercancel", handlePointerCancel)

    return () => {
      if (!app.stage || app.stage.destroyed) return
      app.ticker.remove(updateHitArea)
      app.stage.off("pointerdown", handlePointerDown)
      app.stage.off("pointermove", handlePointerMove)
      app.stage.off("pointerup", handlePointerUp)
      app.stage.off("pointerupoutside", handlePointerUp)
      app.stage.off("pointercancel", handlePointerCancel)
    }
  }, [app, game])

  const drawSelectionBox = (g: BaseGraphic) => {
    if (!isDragging || !game.userControl.currentAction) return

    const tiles = diviseVector2D(startPosition, currentPosition, game.camera.zoom)
    tiles.forEach((v) => {
      g.rect(v.x, v.y, game.camera.zoom, game.camera.zoom)
      g.stroke({ width: 2, color: 0xfeeb77 })
    })
  }

  return <Graphics draw={drawSelectionBox} />
}
