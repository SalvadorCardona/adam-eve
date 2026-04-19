import { describe, expect, it } from "vitest"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { getInventoryItem } from "@/packages/game/inventory/useCase/getInventoryItem"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { workerEntityResource } from "@/app/entity/character/worker/workerEntityResource"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { getResource } from "@/packages/resource/ResourceInterface"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"

const entityMetadata = getResource<EntityResourceInterface>(workerEntityResource)

describe("addToInventory", () => {
  describe("positive quantity", () => {
    it("adds the requested quantity and returns it when there is room", () => {
      const entity = entityMetadata.create()

      const added = addToInventory(entity, woodResourceMetadata, 4)

      expect(added).toBe(4)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(4)
    })

    it("accumulates across successive calls on the same item", () => {
      const entity = entityMetadata.create()

      addToInventory(entity, woodResourceMetadata, 3)
      const added = addToInventory(entity, woodResourceMetadata, 2)

      expect(added).toBe(2)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(5)
    })

    it("caps the quantity to the available free space and returns the capped value", () => {
      const entity = entityMetadata.create()
      const size = entityMetadata.propriety.inventorySize as number

      const added = addToInventory(entity, woodResourceMetadata, size + 100)

      expect(added).toBe(size)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(size)
    })

    it("returns 0 and does not change anything when the inventory is full", () => {
      const entity = entityMetadata.create()
      const size = entityMetadata.propriety.inventorySize as number

      addToInventory(entity, woodResourceMetadata, size)
      const added = addToInventory(entity, woodResourceMetadata, 5)

      expect(added).toBe(0)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(size)
    })

    it("shares the inventory space across different resources", () => {
      const entity = entityMetadata.create()
      const size = entityMetadata.propriety.inventorySize as number

      addToInventory(entity, woodResourceMetadata, size - 2)
      const added = addToInventory(entity, goldResourceMetadata, 5)

      expect(added).toBe(2)
      expect(getInventoryItem(entity, goldResourceMetadata).quantity).toBe(2)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(
        size - 2,
      )
    })
  })

  describe("negative quantity", () => {
    it("removes the requested quantity when available", () => {
      const entity = entityMetadata.create()
      addToInventory(entity, woodResourceMetadata, 6)

      const removed = addToInventory(entity, woodResourceMetadata, -4)

      expect(removed).toBe(-4)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(2)
    })

    it("clamps the removal to the available quantity", () => {
      const entity = entityMetadata.create()
      addToInventory(entity, woodResourceMetadata, 3)

      const removed = addToInventory(entity, woodResourceMetadata, -10)

      expect(removed).toBe(-3)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(0)
    })

    it("returns 0 when removing from an item that does not exist yet", () => {
      const entity = entityMetadata.create()

      const removed = addToInventory(entity, woodResourceMetadata, -5)

      expect(removed).toBe(0)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(0)
    })
  })

  describe("zero quantity", () => {
    it("returns 0 and does not modify the item", () => {
      const entity = entityMetadata.create()
      addToInventory(entity, woodResourceMetadata, 4)

      const result = addToInventory(entity, woodResourceMetadata, 0)

      expect(result).toBe(0)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(4)
    })

    it("returns 0 when called without an explicit quantity", () => {
      const entity = entityMetadata.create()

      const result = addToInventory(entity, woodResourceMetadata)

      expect(result).toBe(0)
      expect(getInventoryItem(entity, woodResourceMetadata).quantity).toBe(0)
    })
  })

  describe("raw inventory target", () => {
    it("works directly on a standalone inventory", () => {
      const inventory = createInventory({ size: 5 })

      const added = addToInventory(inventory, woodResourceMetadata, 3)

      expect(added).toBe(3)
      expect(getInventoryItem(inventory, woodResourceMetadata).quantity).toBe(3)
    })

    it("respects the size of a standalone inventory", () => {
      const inventory = createInventory({ size: 5 })

      const added = addToInventory(inventory, woodResourceMetadata, 100)

      expect(added).toBe(5)
      expect(getInventoryItem(inventory, woodResourceMetadata).quantity).toBe(5)
    })
  })
})
