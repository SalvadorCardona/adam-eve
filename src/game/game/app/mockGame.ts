import { updateContainer } from "@/src/container/container"
import { gameFactory } from "@/src/game/game/gameFactory"
import { addToInventory } from "@/src/game/inventory/InventoryItemInterface"
import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { goldRessourceMetadata } from "@/src/game/inventory/app/gold/woodRessource"
import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
import { houseEntityMetaData } from "@/src/game/entity/app/house/houseEntity"
import { treeEntityMetaData } from "@/src/game/entity/app/tree/TreeEntity"
import { buildRequest } from "@/src/game/entity/app/build-request/BuildRequest"
import { forumEntityMetaData } from "@/src/game/entity/app/forum/ForumEntity"
import { characterEntityMetaData } from "@/src/game/entity/app/character/CharacterEntity"
import { roadEntityMetadata } from "@/src/game/entity/app/road/RoadEntityMetadata"

const mockGame = gameFactory()

addToInventory(
  mockGame.inventory,
  woodRessourceMetadata.factory({
    inventoryItem: {
      quantity: 3,
    },
  }),
)

addToInventory(
  mockGame.inventory,
  waterRessourceMetadata.factory({
    inventoryItem: {
      quantity: 3,
    },
  }),
)

addToInventory(
  mockGame.inventory,
  goldRessourceMetadata.factory({
    inventoryItem: {
      quantity: 5,
    },
  }),
)

const character = characterEntityMetaData.factory({
  entity: {
    position: {
      x: 5,
      y: 5,
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
        y: 4,
      },
    },
  }),
)

addEntityToGame(mockGame, roadEntityMetadata.factory())

addEntityToGame(
  mockGame,
  treeEntityMetaData.factory({
    entity: {
      position: {
        x: -2,
        y: -2,
      },
    },
  }),
)

updateContainer(mockGame.entities, buildRequest.factory({}))

addEntityToGame(
  mockGame,
  forumEntityMetaData.factory({
    entity: {
      position: {
        x: 0,
        y: 0,
      },
    },
  }),
)

export default mockGame
