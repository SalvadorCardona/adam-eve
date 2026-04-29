import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { knowledgeResourceMetadata } from "@/app/entity/resource/knowledge/knowledgeResource"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { stayInBuildingActionResource } from "@/app/action/stayInBuildingActionResource"
import { getEntityProductionSpeed } from "@/packages/game/entity/useCase/query/getEntityProductionSpeed"
import iconUrl from "./icon.svg?url"
import modelUrl from "./model.svg?url"

export const researchCenterEntityResource = createEntityResource({
  "@id": "researchCenter",
  label: "Centre de Recherche",
  entityType: EntityType.building,
  asset: {
    icon: iconUrl,
    model2d: modelUrl,
  },
  propriety: {
    health: { maxLife: 150 },
    size: { x: 2, y: 2, z: 3 },
    work: { numberOfWorker: 1, speedOfProduction: 300 },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 10 }],
    }),
  },
  workerAction: stayInBuildingActionResource,
  onFrame: ({ entity, game }) => {
    const interval = getEntityProductionSpeed(entity)
    if (interval === 0) return
    if (game.time % interval !== 0) return
    addToInventory(game.inventory, knowledgeResourceMetadata, 1)
  },
})
