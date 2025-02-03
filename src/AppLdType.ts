import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

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
  player: "player",
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
  bloodEntity: JsonLdTypeFactory(entityEffect, "blood"),
  // Building
  timberHouseEntity: JsonLdTypeFactory(entityBuilding, "timberHouse"),
  towerEntity: JsonLdTypeFactory(entityBuilding, "tower"),
  workerEntity: JsonLdTypeFactory(entityCharacter, "worker"),
  grassGroundEntity: JsonLdTypeFactory(entityGround, "grass"),
  // Action
  findWorkerAction: JsonLdTypeFactory(typeAction, "findWorkerCharacter"),
  cutTheWoodAction: JsonLdTypeFactory(typeAction, "cutTheWood"),
  towerAttackAction: JsonLdTypeFactory(typeAction, "TowerAttack"),
  // Ressource
  woodRessource: JsonLdTypeFactory(typeRessource, "wood"),
  theDeathAction: JsonLdTypeFactory(typeAction, "TheDeathActionMetadata"),
  gameSize: "gameSize",
}

export const appLdTypeEntity = [
  appLdType.entityCharacter,
  appLdType.entityBuilding,
  appLdType.entityRessource,
  appLdType.entityGround,
]
