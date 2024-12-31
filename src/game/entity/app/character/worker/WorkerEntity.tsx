import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./robot.glb?url"
import iconFarmerSrc from "./iconFarmer.png"
import { entityState } from "@/src/game/entity/EntityInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

export const workerEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "worker"),
  label: "Citoyen",
  asset: {
    model3d: asset,
    icon: iconFarmerSrc,
    animationMapper: {
      [entityState.move]: "Running",
      [entityState.wait]: "Idle",
    },
  },
  propriety: {
    inventorySize: 10,
  },
  defaultEntity: () => {
    return {
      speed: 0.1,
      life: 50,
      size: {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
    }
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
