import { useEffect } from "react"
import useGameContext from "@/packages/UI/provider/useGameContext"
import GameInterface from "@/packages/game/game/GameInterface"
import { ContainerPublish, containerPubSub } from "@/packages/jsonLd/jsonLd"

export const useGameFrame = (callback: (game: GameInterface) => void) => {
  const gameContext = useGameContext()

  useEffect(() => {
    const subscription = gameContext.pubSub.subscribe((e) => {
      callback(e)
    })
    // Cleanup function to unsubscribe when the component unmounts
    return subscription.unsubscribe
  }, [gameContext])
}

export const useGamePubSub = (
  channel: string,
  callback: (e: ContainerPublish) => void,
) => {
  useEffect(() => {
    const id = containerPubSub.subscribe(channel, callback)
    return id.unsubscribe
  }, [])
}
