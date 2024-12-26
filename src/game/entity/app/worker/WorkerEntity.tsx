import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./robot.glb?url"
import iconFarmerSrc from "./iconFarmer.png"
import { entityState } from "@/src/game/entity/EntityInterface"

export const workerEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/character/worker",
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
      scale: {
        x: 0.1,
        y: 0.1,
        z: 0.1,
      },
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
