import useGameContext from "@/packages/ui/provider/useGameContext"
import { Inventory } from "@/packages/ui/Inventory"
import { Inhabitants } from "@/packages/ui/Inhabitants"
import React, { useState } from "react"
import { GameMenu } from "@/packages/ui/menu/GameMenu"
import { useGameFrame } from "@/packages/ui/hook/useGameFrame"
import { Button } from "@/app/components/ui/button"
import { BadgePlus } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import TimeControls from "@/packages/ui/TimeControl"
import FpsCounter from "@/packages/ui/FpsCounter"

export const TopSideBar = () => {
  const gameContext = useGameContext()
  const [tick, setTick] = useState<number>()

  useGameFrame((game) => {
    if (game.time % 30 !== 0) return
    setTick(game["@version"] ?? 1)
  })

  const navigate = useNavigate()

  return (
    <div
      key={"top" + tick}
      className={"fixed flex top-0 left-0  w-full justify-between  p-2 gap-2"}
    >
      <div className={"flex gap-2"}>
        {Object.values(gameContext.game.inventory.member).map((inventoryItem) => {
          return (
            <Inventory
              inventoryItem={inventoryItem}
              key={inventoryItem["@id"] + inventoryItem.quantity}
            />
          )
        })}
        <Inhabitants />
      </div>
      <div className={"flex gap-2 items-center"}>
        <FpsCounter />
        <TimeControls />
        <Button
          className="bg-amber-400 hover:bg-amber-500 text-amber-900"
          onClick={() => navigate({ to: "/current-game" })}
        >
          <BadgePlus className="mr-2 h-4 w-4" /> Nouvelle partie
        </Button>
        <GameMenu></GameMenu>
      </div>
    </div>
  )
}
