import { GameProvider } from "@/src/UI/provider/GameProvider"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"
import { MouseCursor } from "@/src/UI/MouseCursor/MouseCursor"
import GameInterface from "@/src/game/game/GameInterface"
import { mockGames } from "@/src/game/mockGame/mockGame"
import { gameLoader } from "@/src/game/game/gameLoader"
import { PixiJsComponent } from "@/src/UI/graphic-motor/pixiJs/PixiJsComponent"

export default function GameComponent({ game }: { game?: GameInterface }) {
  const currentGame = game ? gameLoader(game) : gameLoader(mockGames.defaultMock)
  return (
    <main className={"h-screen overflow-hidden"}>
      <GameProvider game={currentGame}>
        <PixiJsComponent></PixiJsComponent>
        <InterfaceComponent></InterfaceComponent>
        <MouseCursor></MouseCursor>
      </GameProvider>
    </main>
  )
}
