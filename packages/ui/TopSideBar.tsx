import useGameContext from "@/packages/ui/provider/useGameContext"
import { Inventory } from "@/packages/ui/Inventory"
import React, { useState } from "react"
import { GameMenu } from "@/packages/ui/menu/GameMenu"
import { useGamePubSub } from "@/packages/ui/hook/useGameFrame"
import { InventoryInterface } from "@/packages/game/inventory/InventoryResource"
import { Button } from "@/app/components/ui/button"
import { BadgePlus } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

export const TopSideBar = () => {
  const gameContext = useGameContext()
  const [, setTick] = useState(0)
  //useGameFrame(() => setTick((t) => t + 1))
  const [inventory, setInventory] = useState<InventoryInterface>(
    gameContext.game.inventory,
  )
  useGamePubSub("inventory", (e) => {
    console.log(e)
    console.log(gameContext.game.inventory)
    setInventory({ ...gameContext.game.inventory })
  })

  const navigate = useNavigate()

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
      <div className={"flex gap-2"}>
        <Button
          className="bg-amber-400 hover:bg-amber-500 text-amber-900"
          onClick={() => navigate({ to: "/newGame" })}
        >
          <BadgePlus className="mr-2 h-4 w-4" /> Nouvelle partie
        </Button>
        <GameMenu></GameMenu>
      </div>
    </div>
  )
}
