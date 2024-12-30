import {
  KeyboardControls,
  KeyboardControlsEntry,
  useKeyboardControls,
} from "@react-three/drei"
import React, { useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import useGameContext from "@/src/UI/provider/useGameContext"

interface ControlPropsInterface {}

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
  backAction = "backAction",
  showGrid = "showGrid",
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
  const game = useGameContext().game
  const moveSize = 0.7
  const camera = useThree().camera
  useFrame(() => {
    if (get().back) {
      console.log(camera)
      game.camera.position.z += moveSize
    }
    if (get().forward) {
      game.camera.position.z -= moveSize
    }
    if (get().left) {
      game.camera.position.x -= moveSize
    }
    if (get().right) {
      game.camera.position.x += moveSize
    }
    if (get().showGrid) {
      game.userControl.showGrid = !game.userControl.showGrid
    }
    if (get().backAction) {
      game.userControl.currentAction = undefined
    }
  })

  return <></>
}
