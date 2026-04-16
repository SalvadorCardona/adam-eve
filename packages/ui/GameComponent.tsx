import { GameProvider } from "@/packages/ui/provider/GameProvider"
import { InterfaceComponent } from "@/packages/ui/InterfaceComponent"
import React from "react"
import GameInterface from "@/packages/game/game/GameInterface"
import { mockGames } from "@/packages/game/mockGame/mockGame"
import { gameLoader } from "@/packages/game/game/gameLoader"
import { PixijsAppComponent } from "@/packages/ui/graphic-motor/pixiJs/PixijsAppComponent"

export default function GameComponent({ game }: { game?: GameInterface }) {
  const currentGame = game ? gameLoader(game) : gameLoader(mockGames.defaultMock)
  return (
    <main className={"h-screen overflow-hidden"}>
      <GameProvider game={currentGame}>
        <PixijsAppComponent></PixijsAppComponent>
        <InterfaceComponent></InterfaceComponent>
        {/*<MouseCursor></MouseCursor>*/}
      </GameProvider>
    </main>
  )
}
