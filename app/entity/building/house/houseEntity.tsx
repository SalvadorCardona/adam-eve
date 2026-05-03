import imageIcon from "./icon.png?url"
import model from "./model.png"

import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityResourceInterface, EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const houseEntityMetaData: EntityResourceInterface = createEntityResource({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  entityType: EntityType.building,
  propriety: {
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 5 }],
    }),
    constructionTime: 300,
    health: {
      maxLife: 100,
    },
    housingCapacity: 10,
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  ["@id"]: "house",
  label: "Maison",
})
