import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png"
import model from "./model.png"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import towerAttackActionResource from "@/app/entity/building/tower/towerActionAttackResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { stayInBuildingActionResource } from "@/app/action/stayInBuildingActionResource"

export const towerEntityResource = createEntityResource({
  ["@id"]: "resource/tower",
  entityType: EntityType.building,
  asset: {
    model2d: model,
    icon: imageIcon,
  },
  propriety: {
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 5 }],
    }),
    constructionTime: 450,
    attack: {
      attackRange: 10,
      damage: 80,
      attackSpeed: 60,
    },
    vision: {
      range: 8,
    },
    work: {
      numberOfWorker: 2,
      speedOfProduction: 400,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 1,
      y: 1,
      z: 2,
    },
    defaultActions: [towerAttackActionResource["@id"]!],
  },
  workerAction: stayInBuildingActionResource,
  label: "Tour de défense",
})
