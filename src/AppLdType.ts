import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

const entityBuilding = "entity/building"
const typeAction = "action"
const typeRessource = "action"

export const appLdType = {
  game: "game",
  entity: "entity",
  entityHelper: "entity/helper",
  entityBuilding,
  typeAction,
  entityAttack: "entity/attack",
  entityEffect: "entity/effect",
  entityRessource: "entity/ressource",
  entityCharacter: "entity/character",
  entityGround: "entity/ground",
  ressource: typeRessource,
  saveGame: "save-game",
  userAction: "user-action",
  // Building
  timberHouse: JsonLdTypeFactory(entityBuilding, "timberHouse"),
  tower: JsonLdTypeFactory(entityBuilding, "tower"),
  // Action
  findWorkerAction: JsonLdTypeFactory(typeAction, "findWorkerCharacter"),
  cutTheWoodAction: JsonLdTypeFactory(typeAction, "cutTheWood"),
  // Ressource
  woodRessource: JsonLdTypeFactory(typeRessource, "wood"),
}
