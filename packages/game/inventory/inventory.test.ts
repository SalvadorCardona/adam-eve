import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { expect } from "vitest"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { waterResourceMetadata } from "@/app/inventory/water/woodResource"
import { getTotalQuantityInInventory } from "@/packages/game/inventory/useCase/getTotalQuantityInInventory"
import { inventoryIsFull } from "@/packages/game/inventory/useCase/inventoryIsFull"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { transfertInventoryByItem } from "@/packages/game/inventory/useCase/transfertInventoryByItem"

const entityMetadata = getResource<EntityResourceInterface>(workerEntityResource)

describe("Inventory Test", () => {
  it("Context add To Inventory", () => {
    const entity = entityMetadata.create()

    addToInventory(entity.inventory, woodResourceMetadata, 5)
    expect(getInventoryItem(entity.inventory, woodResourceMetadata).quantity).toBe(5)
    const item = getInventoryItem(entity.inventory, woodResourceMetadata)
    expect(item.quantity).toBe(5)

    addToInventory(entity.inventory, woodResourceMetadata, -3)
    expect(getInventoryItem(entity.inventory, woodResourceMetadata).quantity).toBe(2)
    expect(item.quantity).toBe(2)

    addToInventory(entity.inventory, woodResourceMetadata, -10)
    expect(item.quantity).toBe(0)
  })
  it("Context getTotal Inventory", () => {
    const entity = entityMetadata.create()

    addToInventory(entity.inventory, woodResourceMetadata, 5)
    addToInventory(entity.inventory, goldResourceMetadata, 8)
    addToInventory(entity.inventory, waterResourceMetadata, 13)
    addToInventory(entity.inventory, woodResourceMetadata, 5)

    expect(getTotalQuantityInInventory(entity.inventory)).toBe(10)
  })
  it("Context Inventory is full", () => {
    const entity = entityMetadata.create()

    addToInventory(
      entity.inventory,
      woodResourceMetadata,
      (entityMetadata.propriety.inventorySize as number) - 1,
    )

    expect(inventoryIsFull(entity.inventory)).toBeFalsy()

    addToInventory(
      entity.inventory,
      woodResourceMetadata,
      (entityMetadata.propriety.inventorySize as number) + 1,
    )

    expect(inventoryIsFull(entity.inventory)).toBeTruthy()
  })
  it("Context Transfert Inventory", () => {
    const entitySource = entityMetadata.create()
    const entityTarget = entityMetadata.create()

    addToInventory(entitySource.inventory, woodResourceMetadata, 10)

    expect(
      getInventoryItem(entitySource.inventory, woodResourceMetadata).quantity,
    ).toBe(10)

    transfertInventoryByItem(
      entitySource.inventory,
      entityTarget.inventory,
      woodResourceMetadata,
      3,
    )

    expect(
      getInventoryItem(entitySource.inventory, woodResourceMetadata).quantity,
    ).toBe(7)
    expect(
      getInventoryItem(entityTarget.inventory, woodResourceMetadata).quantity,
    ).toBe(3)

    transfertInventoryByItem(
      entitySource.inventory,
      entityTarget.inventory,
      woodResourceMetadata,
      Infinity,
    )

    expect(
      getInventoryItem(entitySource.inventory, woodResourceMetadata).quantity,
    ).toBe(0)
    expect(
      getInventoryItem(entityTarget.inventory, woodResourceMetadata).quantity,
    ).toBe(10)
  })
})
