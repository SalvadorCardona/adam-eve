import mockGameReal from "./mockGameReal.json"

const mockGame = mockGameReal

export default mockGame

// import { updateContainer } from "@/src/container/container"
// import { gameFactory } from "@/src/game/game/gameFactory"
// import { addEntityToGame } from "@/src/game/entity/useCase/addEntityToGame"
// import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
// import { goldRessourceMetadata } from "@/src/game/inventory/app/gold/woodRessource"
// import { waterRessourceMetadata } from "@/src/game/inventory/app/water/woodRessource"
// import { cutTheWoodActionMetaData } from "@/src/game/action/app/cutTheWoodActionMetaData"
// import { houseEntityMetaData } from "@/src/game/entity/app/house/houseEntity"
// import { treeEntityMetaData } from "@/src/game/entity/app/tree/TreeEntity"
// import { buildRequest } from "@/src/game/entity/app/build-request/BuildRequest"
// import { forumEntityMetaData } from "@/src/game/entity/app/forum/ForumEntity"
// import { workerEntityMetaData } from "@/src/game/entity/app/worker/WorkerEntity"
// import { roadEntityMetadata } from "@/src/game/entity/app/road/RoadEntityMetadata"
// import { wheatRessourceMetadata } from "@/src/game/inventory/app/wheat/wheatRessource"
// import { addAction } from "@/src/game/action/addAction"
// import { findWorkerCharacterActionMetadata } from "@/src/game/action/app/findWorkerCharacterActionMetadata"
// import { addToInventory } from "@/src/game/inventory/addToInventory"
//
// const mockGame = gameFactory()
//
// addToInventory(mockGame.inventory, woodRessourceMetadata["@type"], 15)
// addToInventory(mockGame.inventory, waterRessourceMetadata["@type"], 10)
// addToInventory(mockGame.inventory, wheatRessourceMetadata["@type"], 15)
// addToInventory(mockGame.inventory, goldRessourceMetadata["@type"], 100)
//
// const character = workerEntityMetaData.factory({
//   entity: {
//     position: {
//       y: -8,
//       x: 7,
//     },
//   },
// })
//
// const cutWoodAction = cutTheWoodActionMetaData.factory({
//   entity: character,
//   game: mockGame,
// })
//
// addAction(character.actions, cutWoodAction)
// updateContainer(mockGame.entities, character)
//
// addEntityToGame(
//   mockGame,
//   workerEntityMetaData.factory({
//     entity: {
//       position: {
//         y: -8,
//         x: 0,
//       },
//     },
//   }),
// )
//
// addEntityToGame(
//   mockGame,
//   workerEntityMetaData.factory({
//     entity: {
//       position: {
//         y: -8,
//         x: 1,
//       },
//     },
//   }),
// )
//
// addEntityToGame(
//   mockGame,
//   workerEntityMetaData.factory({
//     entity: {
//       position: {
//         y: -8,
//         x: 3,
//       },
//     },
//   }),
// )
//
// addEntityToGame(
//   mockGame,
//   houseEntityMetaData.factory({
//     entity: {
//       isBuild: false,
//       position: {
//         x: 6,
//         y: -6,
//       },
//     },
//   }),
// )
//
// addEntityToGame(
//   mockGame,
//   houseEntityMetaData.factory({
//     entity: {
//       isBuild: false,
//       position: {
//         x: 6,
//         y: -3,
//       },
//     },
//   }),
// )
//
// addEntityToGame(mockGame, roadEntityMetadata.factory())
//
// addEntityToGame(
//   mockGame,
//   treeEntityMetaData.factory({
//     entity: {
//       position: {
//         x: -4,
//         y: -4,
//       },
//     },
//   }),
// )
//
// updateContainer(mockGame.entities, buildRequest.factory({}))
//
// addEntityToGame(
//   mockGame,
//   forumEntityMetaData.factory({
//     entity: {
//       isBuild: true,
//       position: {
//         x: 0,
//         y: -6,
//       },
//     },
//   }),
// )
//
// addAction(
//   mockGame.actions,
//   findWorkerCharacterActionMetadata.factory({ game: mockGame }),
// )
//
// export default mockGame
