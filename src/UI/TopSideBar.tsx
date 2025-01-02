import useGameContext from "@/src/UI/provider/useGameContext"
import { Inventory } from "@/src/UI/Inventory"
import React from "react"
import { GameMenu } from "@/src/UI/menu/game-menu"

export const TopSideBar = () => {
  const gameContext = useGameContext()

  return (
    <div className={"fixed flex top-0 left-0  w-full justify-between  p-2 gap-2"}>
      <div className={"flex gap-2"}>
        {Object.values(gameContext.game.inventory).map((inventoryItem) => {
          return (
            <Inventory
              inventoryItem={inventoryItem}
              key={inventoryItem["@id"] + "top"}
            />
          )
        })}
      </div>
      <div>
        <GameMenu></GameMenu>
      </div>
    </div>
  )
}
