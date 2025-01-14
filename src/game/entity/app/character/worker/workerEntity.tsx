import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./robot.glb?url"
import asset2D from "./worker.png"

import iconFarmerSrc from "./iconFarmer.png"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { EntityState } from "@/src/game/entity/EntityState"

export const workerEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "worker"),
  label: "Citoyen",
  asset: {
    model2d: asset2D,
    model3d: asset,
    icon: iconFarmerSrc,
    animationMapper: {
      [EntityState.move]: "Walking",
      [EntityState.go_to_tree]: "Walking",
      [EntityState.wait]: "Idle",
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

//
// Dance
// Death
// Idle
// Jump
// No
// Punch
// Running
// Sitting
// Standing
// ThumbsUp
// WalkJump
// Walking
// Wave
// Yes
