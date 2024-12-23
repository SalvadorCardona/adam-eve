import useGameContext from "@/src/UI/provider/useGameContext"
import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import image from "./img.png"

const convertFramesToTime = (frames: number) => {
  const totalSeconds = Math.floor(frames / 60)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export const Time = () => {
  const gameContext = useGameContext()
  const timeString = convertFramesToTime(gameContext.game?.time || 0)

  return (
    <Card>
      <CardContent className={"flex items-center gap-2"}>
        <CardTitle>{timeString}</CardTitle>
        <img className={"h-8"} src={image} alt={"ressource"} />
      </CardContent>
    </Card>
  )
}
