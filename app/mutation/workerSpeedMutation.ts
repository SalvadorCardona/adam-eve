import { createMutationResource } from "@/packages/game/mutation/createMutationResource"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { knowledgeResourceMetadata } from "@/app/entity/resource/knowledge/knowledgeResource"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"

export const WORKER_SPEED_MUTATION_BONUS = 0.5

export const workerSpeedMutation = createMutationResource({
  "@id": "mutation/worker-speed",
  label: "Sérum de célérité",
  description:
    "Augmente la vitesse de déplacement de tous les ouvriers de +50%.",
  buildTime: 600,
  cost: createInventory({
    items: [
      { inventoryItem: knowledgeResourceMetadata["@id"], quantity: 5 },
      { inventoryItem: woodResourceMetadata["@id"], quantity: 10 },
    ],
  }),
  apply: (game) => {
    if (!game.modifiers) return
    game.modifiers.workerSpeedMultiplier =
      (game.modifiers.workerSpeedMultiplier ?? 1) + WORKER_SPEED_MUTATION_BONUS
  },
})
