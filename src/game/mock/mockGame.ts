import { updateContainer } from "@/packages/container/container"
import { characterEntityMetaData } from "@/src/game/entity/character/CharacterEntity"
import { houseEntityMetaData } from "@/src/game/entity/house/houseEntity"
import { forumEntityMetaData } from "@/src/game/entity/forum/ForumEntity"
import { gameFactory } from "@/src/domain/game/gameFactory"
import { woodRessourceMetadata } from "@/src/game/ressource/wood/woodRessource"
import { cutTheWoodActionMetaData } from "@/src/game/action/cutTheWoodActionMetaData"
import { treeEntityMetaData } from "@/src/game/entity/tree/TreeEntity"
import { addToInventory } from "@/src/domain/inventory/InventoryItemInterface"
import { addEntityToGame } from "@/src/domain/entity/addEntityToGame"
import { buildRequest } from "@/src/game/entity/build-request/BuildRequest"

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
    position: {
      x: 1,
      y: 0.2,
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

addEntityToGame(
  mockGame,
  houseEntityMetaData.factory({
    entity: {
      position: {
        x: 4,
        y: 0.2,
        z: 4,
      },
    },
  }),
)

addEntityToGame(
  mockGame,
  treeEntityMetaData.factory({
    entity: {
      position: {
        x: -2,
        y: 0.2,
        z: -2,
      },
    },
  }),
)

addEntityToGame(
  mockGame,
  buildRequest.factory({
    entity: {},
  }),
)

addEntityToGame(
  mockGame,
  forumEntityMetaData.factory({
    entity: {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  }),
)

export default mockGame