import { useEffect } from "react"
import useGameContext from "@/src/UI/provider/useGameContext"
import GameInterface from "@/src/game/game/GameInterface"
import { appLdType } from "@/src/AppLdType"
import { ContainerPublish, containerPubSub } from "@/src/utils/jsonLd/jsonLd"

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

export const useGamePubSub = (
  channel: string,
  callback: (e: ContainerPublish) => void,
) => {
  useEffect(() => {
    const id = containerPubSub.subscribe(channel, callback)
    return () => {
      containerPubSub.unsubscribe(id, appLdType.camera)
    }
  }, [])
}
