import { getMetaData } from "@/src/game/configGame"
import { InventoryItemInterface } from "@/src/domain/inventory/InventoryItemInterface"
import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

export const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getMetaData(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <Card className={"flex"}>
      <CardContent>
        <CardTitle>{inventoryItem.quantity}</CardTitle>
        {icon && <img className={"h-8"} src={icon} alt={"ressource"} />}
        {!icon && <span>{name}</span>}
      </CardContent>
    </Card>
  )
}
