import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { woodRessourceMetadata } from "@/src/game/entity/app/ressource/tree/woodRessource"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { expect } from "vitest"
import { goldRessourceMetadata } from "@/src/game/entity/app/ressource/gold/goldRessource"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { getTotalQuantityInInventory } from "@/src/game/inventory/useCase/getTotalQuantityInInventory"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"
import { workerEntityMetaData } from "@/src/game/entity/app/character/worker/workerEntity"
import { transfertInventoryByItem } from "@/src/game/inventory/useCase/transfertInventoryByItem"

const entityMetadata = getMetaData<EntityMetaDataInterface>(workerEntityMetaData)

describe("Inventory Test", () => {
  it("Context add To Inventory", () => {
    let lastQuantity = 0
    const entity = entityMetadata.factory()

    lastQuantity = addToInventory(entity, woodRessourceMetadata, 5)
    expect(lastQuantity).toBe(5)
    const item = getInventoryItem(entity, woodRessourceMetadata)

    expect(item.quantity).toBe(5)

    lastQuantity = addToInventory(entity, woodRessourceMetadata, -3)
    expect(lastQuantity).toBe(-3)
    expect(item.quantity).toBe(2)

    lastQuantity = addToInventory(entity, woodRessourceMetadata, -10)
    expect(lastQuantity).toBe(-2)
    expect(item.quantity).toBe(0)
  })
  it("Context getTotal Inventory", () => {
    const entity = entityMetadata.factory()

    addToInventory(entity, woodRessourceMetadata, 5)
    addToInventory(entity, goldRessourceMetadata, 8)
    addToInventory(entity, waterRessourceMetadata, 13)
    addToInventory(entity, woodRessourceMetadata, 5)

    expect(getTotalQuantityInInventory(entity)).toBe(10)
  })
  it("Context Inventory is full", () => {
    const entity = entityMetadata.factory()

    addToInventory(
      entity,
      woodRessourceMetadata,
      (entityMetadata.propriety.inventorySize as number) - 1,
    )

    expect(inventoryIsFull(entity)).toBeFalsy()

    addToInventory(
      entity,
      woodRessourceMetadata,
      (entityMetadata.propriety.inventorySize as number) + 1,
    )

    expect(inventoryIsFull(entity)).toBeTruthy()
  })
  it("Context Transfert Inventory", () => {
    const entitySource = entityMetadata.factory()
    const entityTarget = entityMetadata.factory()

    addToInventory(entitySource, woodRessourceMetadata, 10)

    expect(getInventoryItem(entitySource, woodRessourceMetadata).quantity).toBe(10)

    transfertInventoryByItem(entitySource, entityTarget, woodRessourceMetadata, 3)

    expect(getInventoryItem(entitySource, woodRessourceMetadata).quantity).toBe(7)
    expect(getInventoryItem(entityTarget, woodRessourceMetadata).quantity).toBe(3)

    transfertInventoryByItem(
      entitySource,
      entityTarget,
      woodRessourceMetadata,
      Infinity,
    )

    expect(getInventoryItem(entitySource, woodRessourceMetadata).quantity).toBe(0)
    expect(getInventoryItem(entityTarget, woodRessourceMetadata).quantity).toBe(10)
  })
})
