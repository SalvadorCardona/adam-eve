import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset2D from "./worker.png"
import iconFarmerSrc from "./iconFarmer.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"
import { createFramePixiJs } from "@/src/UI/graphic-motor/pixiJs/createFramePixiJs"
import { assetList } from "@/src/app/assetList"

export const workerEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "worker"),
  label: "Citoyen",
  asset: {
    model2d: asset2D,
    icon: iconFarmerSrc,
    animationMapper: {
      [EntityState.wait]: createFramePixiJs({ image: assetList.attack }),
    },
  },
  propriety: {
    inventorySize: 10,
    speed: 1.4,
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
    health: {
      maxLife: 25,
    },
  },
})
