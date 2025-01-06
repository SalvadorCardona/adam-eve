import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

const entityBuilding = "entity/building"
const typeAction = "action"

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
  ressource: "ressource",
  saveGame: "save-game",
  userAction: "user-action",
  timberHouse: JsonLdTypeFactory(entityBuilding, "timberHouse"),
  tower: JsonLdTypeFactory(entityBuilding, "tower"),
  findWorkerAction: JsonLdTypeFactory(typeAction, "findWorkerCharacter"),
}
