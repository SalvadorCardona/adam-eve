import useGameContext from "@/src/UI/provider/useGameContext"
import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import image from "./img.png"

export const Time = () => {
  const gameContext = useGameContext()

  return (
    <Card className={"flex"}>
      <CardContent>
        <CardTitle>{gameContext.game?.time}</CardTitle>
        <img className={"h-8"} src={image} alt={"ressource"} />
      </CardContent>
    </Card>
  )
}
