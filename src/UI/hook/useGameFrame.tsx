import { useEffect } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import GameInterface from "@/src/game/game/GameInterface"

export const useGameFrame = (callback: (game: GameInterface) => void) => {
  const gameContext = useGameContext()

  useEffect(() => {
    const subscription = gameContext.pubSub.subscribe((e) => {
      callback(e)
    })
    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      gameContext.pubSub.unsubscribe(subscription)
    }
  }, [gameContext])
}
