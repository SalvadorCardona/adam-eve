import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"

const entityBuilding = "entity/building"
const entityEffect = "entity/effect"
const entityGround = "entity/ground"
const entityCharacter = "entity/character"
const typeAction = "action"
const typeRessource = "ressource"

export const appLdType = {
  camera: "camera",
  userControl: "userControl",
  mouseState: "mouseState",
  game: "game",
  gameOption: "gameOption",
  players: "player",
  entity: "entity",
  entityBuilding,
  typeAction,
  entityAttack: "entity/attack",
  entityRessource: "entity/ressource",
  entityCharacter,
  entityEffect,
  entityGround,
  ressource: typeRessource,
  saveGame: "save-game",
  userAction: "user-action",
  // Effect
  bloodEntity: createJsonLdType(entityEffect, "blood"),
  // Building
  timberHouseEntity: createJsonLdType(entityBuilding, "timberHouse"),
  towerEntity: createJsonLdType(entityBuilding, "tower"),
  workerEntity: createJsonLdType(entityCharacter, "worker"),
  grassGroundEntity: createJsonLdType(entityGround, "grass"),
  // Action
  findWorkerAction: createJsonLdType(typeAction, "findWorkerCharacter"),
  cutTheWoodAction: createJsonLdType(typeAction, "cutTheWood"),
  towerAttackAction: createJsonLdType(typeAction, "TowerAttack"),
  // Ressource
  theDeathAction: createJsonLdType(typeAction, "TheDeathActionMetadata"),
  gameWorld: "gameWorld",
  // inventory
  inventory: "inventory",
  inventoryItem: "inventoryItem",
}

export const appLdTypeEntity = [
  appLdType.entityCharacter,
  appLdType.entityBuilding,
  appLdType.entityRessource,
  appLdType.entityGround,
]
