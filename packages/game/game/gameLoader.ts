import GameInterface from "@/packages/game/game/GameInterface"
import { updateCollection } from "@/packages/jsonLd/jsonLd"
import { playerMetadata } from "@/packages/game/player/playerMetadata"
import { createInventory } from "@/packages/game/inventory/useCase/createInventory"
import { addToInventory } from "@/packages/game/inventory/useCase/addToInventory"
import { woodResourceMetadata } from "@/app/entity/resource/tree/woodResource"
import { waterResourceMetadata } from "@/app/inventory/water/woodResource"
import { wheatResourceMetadata } from "@/app/inventory/wheat/wheatResource"
import { goldResourceMetadata } from "@/app/entity/resource/gold/goldResource"
import { knowledgeResourceMetadata } from "@/app/entity/resource/knowledge/knowledgeResource"

const defaultInventoryResources = [
  woodResourceMetadata,
  waterResourceMetadata,
  wheatResourceMetadata,
  goldResourceMetadata,
  knowledgeResourceMetadata,
]

export function gameLoader(game: GameInterface): GameInterface {
  if (!game.inventory || !("member" in game.inventory)) {
    game.inventory = createInventory()
  }

  for (const resource of defaultInventoryResources) {
    const type = resource["@id"]
    if (!type) continue
    if (!game.inventory.member[type]) {
      addToInventory(game.inventory, resource, 100)
    }
  }

  updateCollection(game.players, playerMetadata.getPlayer())

  return game
}
