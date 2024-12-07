import { updateContainer } from "@/packages/container/container"
import { characterEntityMetaData } from "@/app/game/entity/character/CharacterEntity"
import { houseEntityMetaData } from "@/app/game/entity/house/houseEntity"
import { forumEntityMetaData } from "@/app/game/entity/forum/ForumEntity"
import { gameFactory } from "@/app/domain/game/gameFactory"
import { woodRessourceMetadata } from "@/app/game/ressource/wood/woodRessource"
import { cutTheWoodActionMetaData } from "@/app/game/action/cutTheWoodActionMetaData"
import { treeEntityMetaData } from "@/app/game/entity/tree/TreeEntity"
import { addToInventory } from "@/app/domain/inventory/InventoryItemInterface"

const mockGame = gameFactory()

addToInventory(
  mockGame.inventory,
  woodRessourceMetadata.factory({
    inventoryItem: {
      quantity: 3,
    },
  }),
)

const character = characterEntityMetaData.factory({
  entity: {
    speed: 0.1,
    life: 50,
    position: {
      x: 1,
      y: 0.2,
      z: 1,
    },
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
})

const cutWoodAction = cutTheWoodActionMetaData.factory({
  entity: character,
  game: mockGame,
})

updateContainer(character.actions, cutWoodAction)
updateContainer(mockGame.entities, character)

updateContainer(
  mockGame.entities,
  houseEntityMetaData.factory({
    entity: {
      speed: 0.1,
      life: 50,
      position: {
        x: 4,
        y: 0.2,
        z: 4,
      },
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  }),
)

updateContainer(
  mockGame.entities,
  treeEntityMetaData.factory({
    entity: {
      speed: 0.1,
      life: 50,
      position: {
        x: 10,
        y: 0.2,
        z: 10,
      },
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
    },
  }),
)

updateContainer(
  mockGame.entities,
  forumEntityMetaData.factory({
    entity: {
      life: 50,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    },
  }),
)

export default mockGame
