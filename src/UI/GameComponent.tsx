import { GameProvider } from "@/src/UI/provider/GameProvider"
import { InterfaceComponent } from "@/src/UI/InterfaceComponent"
import React from "react"
import GameInterface from "@/src/game/game/GameInterface"
import { mockGames } from "@/src/game/mockGame/mockGame"
import { gameLoader } from "@/src/game/game/gameLoader"
import { PixijsAppComponent } from "@/src/UI/graphic-motor/pixiJs/PixijsAppComponent"
import configGame from "@/src/game/game/app/configGame"

export default function GameComponent({ game }: { game?: GameInterface }) {
  configGame
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
