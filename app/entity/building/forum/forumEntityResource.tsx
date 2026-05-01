// import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import imageIcon from "./icon.png?url"
import model from "./model.png"
import { goBuildOfBuildingActionResource } from "@/app/action/goBuildOfBuildingActionResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const forumEntityResource = createEntityResource({
  ["@id"]: "resource/forum",
  entityType: EntityType.building,
  asset: {
    icon: imageIcon,
    model2d: model,
  },
  workerAction: goBuildOfBuildingActionResource,
  propriety: {
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 200,
    },
    size: {
      x: 2,
      y: 2,
      z: 2,
    },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 10 }],
    }),
    constructionTime: 600,
  },
  label: "Centre Ville",
})
