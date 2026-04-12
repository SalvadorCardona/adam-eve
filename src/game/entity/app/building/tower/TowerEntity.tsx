import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { appLdType } from "@/app/AppLdType"
import model from "./model.png"
import { createInventory } from "@/src/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/src/game/entity/app/resource/tree/woodResource"
import { towerAttackActionMetadata } from "@/src/game/entity/app/building/tower/TowerAction"
import { createJsonLdType } from "@/packages/jsonLd/jsonLd"

export const towerEntityMetaData = entityMedataFactory({
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
    defaultActions: [towerAttackActionMetadata["@type"]],
  },
  label: "Tour de défense",
  ["@type"]: createJsonLdType(appLdType.entityBuilding, "tower"),
})
