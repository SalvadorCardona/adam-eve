import { getMetaData } from "@/src/game/game/app/configGame"
import { InventoryItemInterface } from "@/src/game/inventory/InventoryItemInterface"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

export const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getMetaData(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <Card>
      <CardContent className={"flex items-center gap-2"}>
        <span className={"font-extrabold"}>{inventoryItem.quantity}</span>
        {icon && <img className={"h-8 w-9"} src={icon} alt={"ressource"} />}
        {!icon && <span>{name}</span>}
      </CardContent>
    </Card>
  )
}
