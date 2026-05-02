import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png"
import model from "./model.png"
import { getResourceActionResource } from "@/app/action/getResourceActionResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const timberHouseEntityMetaData = createEntityResource({
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 5 }],
    }),
    constructionTime: 300,
  },
  workerAction: getResourceActionResource,
  label: "Maison de bucheron",
  entityType: EntityType.building,
  ["@id"]: "timberHouse",
})
