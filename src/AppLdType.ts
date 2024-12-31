import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"

const entityBuilding = "entity/building"

export const appLdType = {
  game: "game",
  entity: "entity",
  entityHelper: "entity/helper",
  entityBuilding,
  entityRessource: "entity/ressource",
  entityCharacter: "entity/character",
  entityGround: "entity/ground",
  action: "action",
  ressource: "ressource",
  saveGame: "save-game",
  userAction: "user-action",
  timberHouse: JsonLdTypeFactory(entityBuilding, "timberHouse"),
}
