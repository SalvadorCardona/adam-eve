import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./robot.glb?url"
import iconFarmerSrc from "./iconFarmer.png"

export const characterEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: "entity/character/character",
  asset: {
    model3d: asset,
    icon: iconFarmerSrc,
  },
  defaultEntity: () => {
    return {
      state: "Punch",
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
