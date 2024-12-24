import { getMetaData } from "@/src/game/game/app/configGame"
import { InventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import React from "react"
import { Card } from "@/components/ui/card"

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

export const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getMetaData(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <Card className={"flex-col justify-items-center overflow-hidden"}>
      {icon && <img className={"h-10 w-10"} src={icon} alt={"ressource"} />}
      {!icon && <span>{name}</span>}
      <div className={"font-extrabold py-0.5"}>{inventoryItem.quantity}</div>
    </Card>
  )
}
