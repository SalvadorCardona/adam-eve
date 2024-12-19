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
}

export const Control = ({}: ControlPropsInterface) => {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.backAction, keys: ["Escape"] },
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
  const camera = useThree().camera

  useFrame(() => {
    if (get().back) {
      camera.position.setZ(camera.position.z + 0.7)
    }
    if (get().forward) {
      camera.position.setZ(camera.position.z - 0.7)
    }
    if (get().left) {
      camera.position.setX(camera.position.x - 0.7)
    }
    if (get().right) {
      camera.position.setX(camera.position.x + 0.7)
    }
    if (get().right) {
      camera.position.setX(camera.position.x + 0.7)
    }
    if (get().backAction) {
      game.userControl.entitySelection = undefined
      game.userControl.entityShouldBeCreated = undefined
    }
  })

  return <></>
}
