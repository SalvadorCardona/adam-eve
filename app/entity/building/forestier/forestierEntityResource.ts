import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import { EntityType } from "@/packages/game/entity/EntityResourceInterface"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { treeEntityMetaData } from "@/app/entity/resource/tree/TreeEntity"
import { addEntityToGame } from "@/packages/game/entity/useCase/addEntityToGame"
import { createVector3 } from "@/packages/math/vector"
import iconSrc from "./icon.svg?url"
import modelSrc from "./model.svg?url"

const TREE_GROWTH_INTERVAL = 1000
const TREE_GROWTH_RADIUS = 100
const TREE_PLACEMENT_ATTEMPTS = 20

export const forestierEntityResource = createEntityResource({
  "@id": "forestier",
  label: "Forestier",
  entityType: EntityType.building,
  asset: {
    icon: iconSrc,
    model2d: modelSrc,
  },
  propriety: {
    health: { maxLife: 100 },
    size: { x: 2, y: 2, z: 2 },
    resourceForConstruction: createInventory({
      items: [{ inventoryItem: woodResourceMetadata["@id"], quantity: 10 }],
    }),
  },
  onFrame: ({ entity, game }) => {
    if (game.time % TREE_GROWTH_INTERVAL !== 0) return

    for (let attempt = 0; attempt < TREE_PLACEMENT_ATTEMPTS; attempt++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * TREE_GROWTH_RADIUS
      const x = Math.floor(entity.position.x + Math.cos(angle) * distance)
      const z = Math.floor(entity.position.z + Math.sin(angle) * distance)

      const newTree = treeEntityMetaData.create({
        game,
        item: { position: createVector3(x, 1, z) },
      })

      if (treeEntityMetaData.canBeBuild?.({ entity: newTree, game })) {
        addEntityToGame(game, newTree)
        return
      }
    }
  },
})
