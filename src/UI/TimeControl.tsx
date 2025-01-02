import React, { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FastForward, Pause, Play, Rewind } from "lucide-react"
import useGameContext from "@/src/UI/provider/useGameContext"
import { GameState } from "@/src/game/game/GameInterface"

const convertFramesToTime = (frames: number) => {
  const totalSeconds = Math.floor(frames / 60)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export default function TimeControls() {
  const gameContext = useGameContext()
  const speed = gameContext.game.gameSpeed
  const isPaused = useMemo(() => {
    return gameContext.game.gameState === GameState.PAUSE
  }, [gameContext.game.gameState])

  const canBeUpSpeed = useMemo(() => {
    return gameContext.game.gameSpeed <= 1
  }, [gameContext.game.gameSpeed])

  const canBeDownSpeed = useMemo(() => {
    return gameContext.game.gameSpeed >= 1
  }, [gameContext.game.gameSpeed])

  const timeString = convertFramesToTime(gameContext.game?.time || 0)

  const handleSpeedChange = (newSpeed: number) => {
    gameContext.game.gameSpeed = newSpeed
  }

  const handlePauseToggle = () => {
    gameContext.game.gameState =
      gameContext.game.gameState === GameState.RUN ? GameState.PAUSE : GameState.RUN
  }

  return (
    <>
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-6xl font-bold text-white">PAUSE</h2>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-100 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-4">
          <div>{timeString}</div>
          <Button
            disabled={isPaused || !canBeDownSpeed}
            onClick={() => handleSpeedChange(0.5)}
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2"
          >
            <Rewind size={24} />
          </Button>
          <Button
            onClick={handlePauseToggle}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2"
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </Button>
          <Button
            disabled={isPaused || !canBeUpSpeed}
            onClick={() => handleSpeedChange(2)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2"
          >
            <FastForward size={24} />
          </Button>
        </div>
        <div className="text-center mt-2 font-medium text-amber-800">
          {isPaused ? "En pause" : `Vitesse: ${speed}x`}
        </div>
      </div>
    </>
  )
}
