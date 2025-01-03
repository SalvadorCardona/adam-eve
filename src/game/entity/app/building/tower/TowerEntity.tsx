import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import imageIcon from "./icon.png?url"
import imageSource from "./tower.glb?url"
import { woodRessourceMetadata } from "@/src/game/inventory/app/wood/woodRessource"
import { appLdType } from "@/src/AppLdType"
import { TowerAttackActionMetadata } from "@/src/game/entity/app/building/tower/TowerAction"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { addAction } from "@/src/game/action/addAction"

export const towerEntityMetaData = entityMedataFactory({
  asset: {
    model3d: imageSource,
    icon: imageIcon,
  },
  propriety: {
    ressourceForConstruction: {
      [woodRessourceMetadata["@type"]]: woodRessourceMetadata.factory({
        quantity: 5,
      }),
    },
    attack: {
      attackRange: 5,
      damage: 1,
      attackSpeed: 60,
    },
  },
  label: "Tour de défense",
  ["@type"]: appLdType.tower,
  defaultEntity: () => {
    const towerAttackAction = TowerAttackActionMetadata.factory()
    const actionBag: ActionBagInterface = {}

    addAction(actionBag, towerAttackAction)

    return {
      actions: actionBag,
      numberOfWorker: 2,
      life: 50,
      size: {
        x: 2,
        y: 2,
        z: 2,
      },
    }
  },
})
