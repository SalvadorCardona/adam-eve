import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./Zombie.glb?url"
import iconFarmerSrc from "./img.png"
import { entityState, factionState } from "@/src/game/entity/EntityInterface"
import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"

// https://poly.pizza/m/xqEzosAVYX
export const zombieEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "zombie"),
  label: "Citoyen",
  asset: {
    model3d: asset,
    icon: iconFarmerSrc,
    animationMapper: {
      [entityState.move]: "Armature|Walk2",
      [entityState.wait]: "Armature|Idle",
      [entityState.attack]: "Armature|Attack",
    },
  },
  propriety: {
    inventorySize: 10,
    speed: 0.02,
  },
  defaultEntity: () => {
    return {
      faction: factionState.enemy,
      life: 50,
      size: {
        x: 0.8,
        y: 0.8,
        z: 0.8,
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
