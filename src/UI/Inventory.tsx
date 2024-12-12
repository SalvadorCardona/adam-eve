import { getMetaData } from "@/src/game/configGame"
import { InventoryItemInterface } from "@/src/domain/inventory/InventoryItemInterface"

interface InventoryPropsInterface {
  inventoryItem: InventoryItemInterface
}

export const Inventory = ({ inventoryItem }: InventoryPropsInterface) => {
  const inventoryMetaData = getMetaData(inventoryItem) ?? null
  const icon = inventoryMetaData?.asset?.icon
  const name = inventoryMetaData?.["@type"]
  return (
    <div className={"flex"}>
      {icon && <img className={"h-8"} src={icon} alt={"ressource"} />}
      {!icon && <span>{name}</span>}
      <span>{inventoryItem.quantity}</span>
    </div>
  )
}
