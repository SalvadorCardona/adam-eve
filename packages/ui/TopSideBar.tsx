import useGameContext from "@/packages/ui/provider/useGameContext"
import { Inventory } from "@/packages/ui/Inventory"
import React, { useState } from "react"
import { GameMenu } from "@/packages/ui/menu/GameMenu"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"

export const TopSideBar = () => {
  const gameContext = useGameContext()
  const [, setTick] = useState(0)
  //useGameFrame(() => setTick((t) => t + 1))
  const [inventory, setInventory] = useState<InventoryInterface>(
    gameContext.game.inventory,
  )
  useGamePubSub("inventory", (e) => {
    setTick((t) => t + 1)
    setInventory({ ...gameContext.game.inventory })
  })

  return (
    <div className={"fixed flex top-0 left-0  w-full justify-between  p-2 gap-2"}>
      <div className={"flex gap-2"}>
        {Object.values(inventory.member).map((inventoryItem) => {
          return (
            <Inventory
              inventoryItem={inventoryItem}
              key={inventoryItem["@id"] + inventoryItem.quantity}
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
