import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import iconFarmerSrc from "./img.png"
import zombieUrl from "./zombie.png"

import { JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { ZombieAttackActionMetadata } from "@/src/game/entity/app/character/zombie/zombieAttackActionMetadata"
import { EntityState } from "@/src/game/entity/EntityState"
import { EntityFaction } from "@/src/game/entity/EntityInterface"

export const zombieEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "zombie"),
  label: "Zombie",
  asset: {
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
