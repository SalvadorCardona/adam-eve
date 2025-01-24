import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { appLdType } from "@/src/AppLdType"
import { TowerAttackActionMetadata } from "@/src/game/entity/app/building/tower/TowerAction"
import model from "./model.png"

export const towerEntityMetaData = entityMedataFactory({
  asset: {
    model2d: model,
    icon: imageIcon,
  },
  propriety: {
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 5,
      }),
    },
    attack: {
      attackRange: 250,
      damage: 1,
      attackSpeed: 60,
    },
    work: {
      numberOfWorker: 2,
    },
    health: {
      maxLife: 100,
    },
    size: {
      x: 100,
      y: 100,
      z: 100,
    },
    defaultActions: [TowerAttackActionMetadata["@type"]],
  },
  label: "Tour de défense",
  ["@type"]: appLdType.towerEntity,
})
