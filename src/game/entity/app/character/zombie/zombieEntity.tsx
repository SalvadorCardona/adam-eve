import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./zombie2.glb?url"
import iconFarmerSrc from "./img.png"
import zombieUrl from "./zombie.png"

import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { ZombieAttackActionMetadata } from "@/src/game/entity/app/character/zombie/zombieAttackActionMetadata"
import { EntityState } from "@/src/game/entity/EntityState"
import { EntityFaction } from "@/src/game/entity/EntityInterface"

// : https://poly.pizza/m/y9KWOVG21R
// "CharacterArmature|Death"
// "CharacterArmature|Gun_Shoot"
// "CharacterArmature|HitRecieve"
// "CharacterArmature|HitRecieve_2"
// "CharacterArmature|Idle"
// "CharacterArmature|Idle_Gun"
// "CharacterArmature|Idle_Gun_Pointing"
// "CharacterArmature|Idle_Gun_Shoot"
// "CharacterArmature|Idle_Neutral"
// "CharacterArmature|Idle_Sword"
// "CharacterArmature|Interact"
// "CharacterArmature|Kick_Left"
// "CharacterArmature|Kick_Right"
// "CharacterArmature|Punch_Left"
// "CharacterArmature|Punch_Right"
// "CharacterArmature|Roll"
// "CharacterArmature|Run"
// "CharacterArmature|Run_Back"
// "CharacterArmature|Run_Left"
// "CharacterArmature|Run_Right"
// "CharacterArmature|Run_Shoot"
// "CharacterArmature|Sword_Slash"
// "CharacterArmature|Walk"
// "CharacterArmature|Wave"
//
//
export const zombieEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "zombie"),
  label: "Zombie",
  asset: {
    model3d: asset,
    model2d: zombieUrl,
    icon: iconFarmerSrc,
    animationMapper: {
      [EntityState.move]: "CharacterArmature|Walk",
      [EntityState.wait]: "CharacterArmature|Idle",
      [EntityState.attack]: "CharacterArmature|Kick_Left",
    },
  },
  propriety: {
    speed: 1,
    attack: {
      damage: 1,
      attackRange: 20,
      attackSpeed: 60,
    },
    size: {
      x: 50,
      y: 50,
      z: 50,
    },
    health: {
      maxLife: 100,
    },
    defaultActions: [ZombieAttackActionMetadata["@type"]],
  },
  defaultEntity: () => ({ faction: EntityFaction.enemy }),
})
