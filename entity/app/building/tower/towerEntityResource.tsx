import { entityResourceFactory } from "@/packages/game/entity/EntityResourceFactory"
import imageIcon from "./icon.png?url"
import model from "./model.png"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/entity/app/resource/tree/woodResource"
import { towerAttackActionResource } from "@/entity/app/building/tower/towerActionAttackResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"

export const towerEntityResource = entityResourceFactory({
  ["@id"]: "resource/tower",
  entityType: EntityType.building,
  asset: {
    model2d: model,
    icon: imageIcon,
  },
  propriety: {
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata, quantity: 5 }],
    }),
    attack: {
      attackRange: 3,
      damage: 1,
      attackSpeed: 60,
    },
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 2,
      y: 2,
      z: 4,
    },
    defaultActions: [towerAttackActionResource["@type"]],
  },
  label: "Tour de défense",
})
