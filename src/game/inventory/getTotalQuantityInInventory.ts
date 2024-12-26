import EntityInterface from "@/src/game/entity/EntityInterface"

export function getTotalQuantityInInventory(entity: EntityInterface): number {
  const inventory = entity.inventory

  let totalQuantity = 0

  for (const item of Object.values(inventory)) {
    totalQuantity += item.quantity
  }

  return totalQuantity
}
