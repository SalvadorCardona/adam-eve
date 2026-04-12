const entityBuilding = "entity/building"
const entityEffect = "entity/effect"
const entityGround = "entity/ground"
const entityCharacter = "entity/character"
const typeAction = "action"
const typeResource = "resource"

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
  entityResource: "entity/resource",
  entityCharacter,
  entityEffect,
  entityGround,
  resource: typeResource,
  saveGame: "save-game",
  userAction: "user-action",
  // Effect
  // Building
  // Action
  // Resource
  gameWorld: "gameWorld",
  // inventory
  inventory: "inventory",
  inventoryItem: "inventoryItem",
}

export const appLdTypeEntity = [
  appLdType.entityCharacter,
  appLdType.entityBuilding,
  appLdType.entityResource,
  appLdType.entityGround,
]
