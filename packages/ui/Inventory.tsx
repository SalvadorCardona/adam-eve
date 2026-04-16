import { InventoryItemInterface } from "@/packages/game/inventory/InventoryItemInterface"
import React from "react"
import { Card } from "@/app/components/ui/card"
import { getResource } from "@/packages/resource/ResourceInterface"
import { BaseGameResource } from "@/packages/game/BaseGameResource"

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

export const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getResource<BaseGameResource>(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <Card className={"flex-col justify-items-center overflow-hidden"}>
      {icon && <img className={"h-10 w-10"} src={icon} alt={"resource"} />}
      {!icon && <span>{name}</span>}
      <div className={"font-extrabold py-0.5"}>{inventoryItem.quantity}</div>
    </Card>
  )
}
