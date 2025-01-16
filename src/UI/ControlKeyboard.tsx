import { useEffect, useMemo } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { useGameFrame } from "@/src/UI/hook/useGameFrame"
import { GameState } from "@/src/game/game/GameInterface"
import { updateContainer } from "@/src/container/container"

interface ControlPropsInterface {}

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  backAction = "backAction",
  showGrid = "showGrid",
  rotate = "rotate",
  pause = "pause",
  wheelUp = "wheelUp",
  wheelDown = "wheelDown",
}

interface ControlItemInterface {
  name: Controls
  keys: string[]
  cb?: () => void
}

const keysPressed: Record<string, boolean> = {}

function valideKeyBoardInput(
  controlList: ControlItemInterface[],
  keysPressed: Record<string, boolean>,
): void {
  const keyPressedResult = Object.keys(keysPressed)
    .map((key) => {
      if (keysPressed[key]) return key

      return false
    })
    .filter((e) => e !== false)

  controlList.forEach((control) => {
    control.keys.forEach((e) => {
      keyPressedResult.includes(e)
      if (keyPressedResult.includes(e) && control.cb) {
        control.cb()
      }
    })
  })
}

export const ControlKeyboard = () => {
  const { game, updateGame } = useGameContext()
  const moveSize = 10

  const controlList = useMemo<ControlItemInterface[]>(
    () => [
      {
        name: Controls.forward,
        keys: ["ArrowUp", "KeyW"],
        cb: () => {
          game.camera.position.z += moveSize
          updateContainer(game, game.camera)
        },
      },
      {
        name: Controls.back,
        keys: ["ArrowDown", "KeyS"],
        cb: () => {
          game.camera.position.z -= moveSize
          updateContainer(game, game.camera)
        },
      },
      {
        name: Controls.left,
        keys: ["ArrowLeft", "KeyA"],
        cb: () => {
          game.camera.position.x += moveSize
          updateContainer(game, game.camera)
        },
      },
      {
        name: Controls.right,
        keys: ["ArrowRight", "KeyD"],
        cb: () => {
          game.camera.position.x -= moveSize
          updateContainer(game, game.camera)
        },
      },
      {
        name: Controls.backAction,
        keys: ["Escape"],
        cb: () => {
          game.userControl.currentAction = undefined
          updateContainer(game, game.userControl)
        },
      },
      {
        name: Controls.showGrid,
        keys: ["KeyG"],
        cb: () => {
          game.userControl.showGrid = !game.userControl.showGrid
          updateContainer(game, game.userControl)
        },
      },
      {
        name: Controls.rotate,
        keys: ["KeyR"],
        cb: () => {
          game.userControl.rotation = (game.userControl?.rotation ?? 0) + Math.PI / 2
          updateContainer(game, game.userControl)
        },
      },
      {
        name: Controls.pause,
        keys: ["KeyP"],
        cb: () => {
          game.gameState =
            game.gameState === GameState.RUN ? GameState.PAUSE : GameState.RUN
        },
      },
      {
        name: Controls.wheelUp,
        keys: ["WheelUp"],
        cb: () => {
          keysPressed["WheelUp"] = false
        },
      },
      {
        name: Controls.wheelDown,
        keys: ["WheelDown"],
        cb: () => {
          keysPressed["WheelDown"] = false
        },
      },
    ],
    [],
  )

  useGameFrame(() => {
    valideKeyBoardInput(controlList, keysPressed)
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed[event.code] = true
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed[event.code] = false
    }

    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleScroll = (e: WheelEvent) => {
    const wheelAction = e.deltaY > 0 ? "WheelUp" : "WheelDown"
    keysPressed[wheelAction] = true
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll)
    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [])

  return null
}
