import { GameProvider } from "@/packages/UI/provider/GameProvider"
import { InterfaceComponent } from "@/packages/UI/InterfaceComponent"
import React from "react"
import GameInterface from "@/packages/game/game/GameInterface"
import { mockGames } from "@/packages/game/mockGame/mockGame"
import { gameLoader } from "@/packages/game/game/gameLoader"
import { PixijsAppComponent } from "@/packages/UI/graphic-motor/pixiJs/PixijsAppComponent"

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
