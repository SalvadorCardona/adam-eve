import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { appLdType } from "@/src/AppLdType"
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
      attackRange: 3,
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
      x: 2,
      y: 2,
      z: 2,
    },
    defaultActions: [appLdType.towerAttackAction],
  },
  label: "Tour de défense",
  ["@type"]: appLdType.towerEntity,
})
