import {
  KeyboardControls,
  KeyboardControlsEntry,
  useKeyboardControls,
} from "@react-three/drei"
import React, { useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import useGameContext from "@/src/UI/provider/useGameContext"
import { GameState } from "@/src/game/game/GameInterface"

interface ControlPropsInterface {}

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
  backAction = "backAction",
  showGrid = "showGrid",
  rotate = "rotate",
  pause = "pause",
}

export const ControlKeyboard = ({}: ControlPropsInterface) => {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.backAction, keys: ["Escape"] },
      { name: Controls.showGrid, keys: ["KeyG"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.rotate, keys: ["KeyR"] },
      { name: Controls.pause, keys: ["KeyP"] },
    ],
    [],
  )

  return (
    <KeyboardControls map={map}>
      <Elem></Elem>
    </KeyboardControls>
  )
}

interface ElemPropsInterface {}

const Elem = ({}: ElemPropsInterface) => {
  const [sub, get] = useKeyboardControls<Controls>()
  const gameContext = useGameContext()
  const game = gameContext.game
  const moveSize = 0.7

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (get().rotate) {
        game.userControl.rotation = (game.userControl?.rotation ?? 0) + Math.PI / 2
      }
      if (get().pause) {
        game.gameState =
          game.gameState === GameState.RUN ? GameState.PAUSE : GameState.RUN
      }
    }

    window.addEventListener("keyup", handleKeyUp)

    // Nettoyage pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [get])

  useFrame(() => {
    if (get().back) {
      game.camera.position.z += moveSize
      gameContext.updateGame(game)
    }
    if (get().forward) {
      game.camera.position.z -= moveSize
      gameContext.updateGame(game)
    }
    if (get().left) {
      game.camera.position.x -= moveSize
      gameContext.updateGame(game)
    }
    if (get().right) {
      game.camera.position.x += moveSize
      gameContext.updateGame(game)
    }
    if (get().showGrid) {
      game.userControl.showGrid = !game.userControl.showGrid
      gameContext.updateGame(game)
    }
    if (get().backAction) {
      game.userControl.currentAction = undefined
      gameContext.updateGame(game)
    }
  })

  return <></>
}
