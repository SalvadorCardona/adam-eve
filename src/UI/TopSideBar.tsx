import useGameContext from "@/src/UI/provider/useGameContext"
import { Inventory } from "@/src/UI/Inventory"
import { Time } from "@/src/UI/time/Time"
import React from "react"

export const TopSideBar = () => {
  const gameContext = useGameContext()

  return (
    <div className={"fixed flex top-0 left-0  w-full h-16 p-2 gap-2"}>
      {Object.values(gameContext.game.inventory).map((inventoryItem) => {
        return (
          <Inventory
            inventoryItem={inventoryItem}
            key={inventoryItem["@id"] + "top"}
          />
        )
      })}
      <div>
        <Time></Time>
      </div>
    </div>
  )
}