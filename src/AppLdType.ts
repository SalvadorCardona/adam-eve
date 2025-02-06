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
  // Building
  // Action
  // Ressource
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
