import { addToInventory } from "@/src/game/inventory/useCase/addToInventory"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { getMetaData } from "@/src/game/game/app/getMetaData"
import { workerEntityMetaDataType } from "@/src/game/entity/app/character/worker/workerEntityMetaDataType"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getInventoryItem } from "@/src/game/inventory/useCase/getInventoryItem"
import { expect } from "vitest"
import { goldRessourceMetadata } from "@/src/game/inventory/app/gold/goldRessource"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { getTotalQuantityInInventory } from "@/src/game/inventory/useCase/getTotalQuantityInInventory"
import { inventoryIsFull } from "@/src/game/inventory/useCase/inventoryIsFull"

describe("Inventory Test", () => {
  it("Context add To Inventory", () => {
    const entity = getMetaData<EntityMetaDataInterface>(
      workerEntityMetaDataType,
    ).factory()

    addToInventory(entity, woodRessourceMetadata, 5)

    const item = getInventoryItem(entity, woodRessourceMetadata)

    expect(item.quantity).toBe(5)
  })
  it("Context getTotal Inventory", () => {
    const entity = getMetaData<EntityMetaDataInterface>(
      workerEntityMetaDataType,
    ).factory()

    addToInventory(entity, woodRessourceMetadata, 5)
    addToInventory(entity, goldRessourceMetadata, 8)
    addToInventory(entity, waterRessourceMetadata, 13)
    addToInventory(entity, woodRessourceMetadata, 5)

    expect(getTotalQuantityInInventory(entity)).toBe(10)
  })
  it("Context Inventory is full", () => {
    const entityMetadata = getMetaData<EntityMetaDataInterface>(
      workerEntityMetaDataType,
    )
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
})
