import React from "react"
import { Card } from "@/app/components/ui/card"
import useGameContext from "@/packages/ui/provider/useGameContext"
import workerIcon from "@/app/entity/character/worker/iconFarmer.png"
import {
  computeHousingCapacity,
  countWorkers,
} from "@/app/entity/building/house/housingUseCase"

export const Inhabitants = () => {
  const gameContext = useGameContext()

  const workers = countWorkers(gameContext.game)
  const capacity = computeHousingCapacity(gameContext.game)
  const isFull = capacity > 0 && workers >= capacity

  return (
    <Card className={"flex-col justify-items-center overflow-hidden"}>
      <img className={"h-10 w-10"} src={workerIcon} alt={"workers"} />
      <div
        className={
          "font-extrabold py-0.5 px-2 " + (isFull ? "text-red-600" : "")
        }
        title="Citoyens / Capacité d'accueil"
      >
        {workers} / {capacity}
      </div>
    </Card>
  )
}
