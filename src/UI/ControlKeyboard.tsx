import { useEffect, useMemo } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { useGameFrame } from "@/src/UI/hook/useGameFrame"
import { GameState } from "@/src/game/game/GameInterface"
import { updateGame } from "@/src/game/game/updateGame"
import { useNavigate } from "@tanstack/react-router"

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
  newGame = "newGame",
}

interface ControlItemInterface {
  name: Controls
  keys: string[]
  cb?: () => void
  type?: "keyup" | string
}

const keysPressed: Record<string, boolean> = {}

function valideKeyBoardInput(
  controlList: ControlItemInterface[],
  keysPressed: Record<string, boolean>,
  type?: "keyup" | string,
): void {
  const keyPressedResult = !type
    ? Object.keys(keysPressed)
        .map((key) => {
          if (keysPressed[key]) return key

          return false
        })
        .filter((e) => e !== false)
    : Object.keys(keysPressed)

  controlList.forEach((control) => {
    control.keys.forEach((e) => {
      keyPressedResult.includes(e)
      if (keyPressedResult.includes(e) && control.cb) {
        if (control.type && type === control.type) {
          control.cb()
        }
        if (!control.type) {
          control.cb()
        }
      }
    })
  })
}

export const ControlKeyboard = () => {
  const navigate = useNavigate()
  const { game } = useGameContext()
  const moveSize = 10

  const controlList = useMemo<ControlItemInterface[]>(
    () => [
      {
        name: Controls.forward,
        keys: ["ArrowUp", "KeyW"],
        cb: () => {
          game.camera.position.z += moveSize
          updateGame(game, game.camera)
        },
      },
      {
        name: Controls.back,
        keys: ["ArrowDown", "KeyS"],
        cb: () => {
          game.camera.position.z -= moveSize
          updateGame(game, game.camera)
        },
      },
      {
        name: Controls.left,
        keys: ["ArrowLeft", "KeyA"],
        cb: () => {
          game.camera.position.x += moveSize
          updateGame(game, game.camera)
        },
      },
      {
        name: Controls.right,
        keys: ["ArrowRight", "KeyD"],
        cb: () => {
          game.camera.position.x -= moveSize
          updateGame(game, game.camera)
        },
      },
      {
        name: Controls.backAction,
        keys: ["Escape"],
        cb: () => {
          game.userControl.currentAction = undefined
          game.userControl.entitiesSelected = []
          updateGame(game, game.userControl)
        },
      },
      {
        name: Controls.showGrid,
        keys: ["KeyG"],
        type: "keyup",
        cb: () => {
          game.userControl.showGrid = !game.userControl.showGrid
          updateGame(game, game.userControl)
        },
      },
      {
        name: Controls.rotate,
        keys: ["KeyR"],
        cb: () => {
          game.userControl.rotation = (game.userControl?.rotation ?? 0) + Math.PI / 2
          updateGame(game, game.userControl)
        },
      },
      {
        name: Controls.pause,
        keys: ["KeyP"],
        type: "keyup",
        cb: () => {
          game.gameOption.gameState =
            game.gameOption.gameState === GameState.RUN
              ? GameState.PAUSE
              : GameState.RUN
        },
      },
      {
        name: Controls.wheelUp,
        keys: ["WheelUp"],
        cb: () => {
          game.camera.zoom += 1
          updateGame(game, game.camera)
          keysPressed["WheelUp"] = false
        },
      },
      {
        name: Controls.wheelDown,
        keys: ["WheelDown"],
        cb: () => {
          game.camera.zoom -= 1
          updateGame(game, game.camera)
          keysPressed["WheelDown"] = false
        },
      },
      {
        name: Controls.newGame,
        keys: ["KeyN"],
        type: "keyup",
        cb: () => {
          navigate({ to: "/newGame" })
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
      valideKeyBoardInput(controlList, keysPressed, event.type)
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
