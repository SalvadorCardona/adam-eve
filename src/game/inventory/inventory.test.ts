import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import { EntityResourceInterface } from "@/src/game/entity/EntityResourceInterface"
import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { expect } from "vitest"
import { goldResourceMetadata } from "@/src/game/entity/app/resource/gold/goldResource"
import { waterResourceMetadata } from "@/src/game/inventory/app/water/woodResource"
import { getTotalQuantityInInventory } from "@/src/game/inventory/useCase/getTotalQuantityInInventory"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"
import { workerEntityResource } from "@/src/game/entity/app/character/worker/workerEntityResource"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"

const entityMetadata = getMetaData<EntityResourceInterface>(workerEntityResource)

describe("Inventory Test", () => {
  it("Context add To Inventory", () => {
    let lastQuantity = 0
    const entity = entityMetadata.factory()

    lastQuantity = addToInventory(entity, woodResourceMetadata, 5)
    expect(lastQuantity).toBe(5)
    const item = getInventoryItem(entity, woodResourceMetadata)

    expect(item.quantity).toBe(5)

    lastQuantity = addToInventory(entity, woodResourceMetadata, -3)
    expect(lastQuantity).toBe(-3)
    expect(item.quantity).toBe(2)

    lastQuantity = addToInventory(entity, woodResourceMetadata, -10)
    expect(lastQuantity).toBe(-2)
    expect(item.quantity).toBe(0)
  })
  it("Context getTotal Inventory", () => {
    const entity = entityMetadata.factory()

    addToInventory(entity, woodResourceMetadata, 5)
    addToInventory(entity, goldResourceMetadata, 8)
    addToInventory(entity, waterResourceMetadata, 13)
    addToInventory(entity, woodResourceMetadata, 5)

    expect(getTotalQuantityInInventory(entity)).toBe(10)
  })
  it("Context Inventory is full", () => {
    const entity = entityMetadata.factory()

    addToInventory(
      entity,
      woodResourceMetadata,
      (entityMetadata.propriety.inventorySize as number) - 1,
    )

    expect(inventoryIsFull(entity)).toBeFalsy()

    addToInventory(
      entity,
      woodResourceMetadata,
      (entityMetadata.propriety.inventorySize as number) + 1,
    )

    expect(inventoryIsFull(entity)).toBeTruthy()
  })
  it("Context Transfert Inventory", () => {
    const entitySource = entityMetadata.factory()
    const entityTarget = entityMetadata.factory()

    addToInventory(entitySource, woodResourceMetadata, 10)

    expect(getInventoryItem(entitySource, woodResourceMetadata).quantity).toBe(10)

    transfertInventoryByItem(entitySource, entityTarget, woodResourceMetadata, 3)

    expect(getInventoryItem(entitySource, woodResourceMetadata).quantity).toBe(7)
    expect(getInventoryItem(entityTarget, woodResourceMetadata).quantity).toBe(3)

    transfertInventoryByItem(
      entitySource,
      entityTarget,
      woodResourceMetadata,
      Infinity,
    )

    expect(getInventoryItem(entitySource, woodResourceMetadata).quantity).toBe(0)
    expect(getInventoryItem(entityTarget, woodResourceMetadata).quantity).toBe(10)
  })
})
