import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { knowledgeResourceMetadata } from "@/app/entity/resource/knowledge/knowledgeResource"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import iconUrl from "./icon.svg?url"
import modelUrl from "./model.svg?url"

const KNOWLEDGE_GENERATION_INTERVAL = 300

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
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 10 }],
    }),
  },
  onFrame: ({ entity, game }) => {
    if (game.time % KNOWLEDGE_GENERATION_INTERVAL === 0) {
      addToInventory(game.inventory, knowledgeResourceMetadata, 1)
    }
  },
})
