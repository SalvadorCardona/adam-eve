import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

const entityBuilding = "entity/building"
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
  entityCharacter: "entity/character",
  entityEffect: "entity/effect",
  entityGround: "entity/ground",
  ressource: typeRessource,
  saveGame: "save-game",
  userAction: "user-action",
  // Building
  timberHouseEntity: JsonLdTypeFactory(entityBuilding, "timberHouse"),
  towerEntity: JsonLdTypeFactory(entityBuilding, "tower"),
  // Action
  findWorkerAction: JsonLdTypeFactory(typeAction, "findWorkerCharacter"),
  cutTheWoodAction: JsonLdTypeFactory(typeAction, "cutTheWood"),
  // Ressource
  woodRessource: JsonLdTypeFactory(typeRessource, "wood"),
  theDeathAction: JsonLdTypeFactory(typeAction, "TheDeathActionMetadata"),
}

export const appLdTypeEntity = [
  appLdType.entityGround,
  appLdType.entityRessource,
  appLdType.entityBuilding,
  appLdType.entityCharacter,
]
