import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./Zombie.glb?url"
import iconFarmerSrc from "./img.png"
import { EntityState, factionState } from "@/src/game/entity/EntityInterface"
import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { addAction } from "@/src/game/action/addAction"
import { findClosestInGame } from "@/src/utils/3Dmath/findClosest"
import { towerEntityMetaData } from "@/src/game/entity/app/building/tower/TowerEntity"
import { distanceBetweenVector3 } from "@/src/utils/3Dmath/distanceBetweenVector3"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import { getEntityInGameByIri } from "@/src/game/entity/useCase/getEntityInGameByIri"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/src/game/entity/useCase/entityAttackEntity"
import { getMetaData } from "@/src/game/game/app/configGame"

// https://poly.pizza/m/xqEzosAVYX
// animation [
//     "Armature|Attack",
//     "Armature|Bite_ground",
//     "Armature|Crawl",
//     "Armature|Die",
//     "Armature|Die2",
//     "Armature|Headbutt",
//     "Armature|Hit_reaction",
//     "Armature|Idle",
//     "Armature|Running_Crawl",
//     "Armature|Scream",
//     "Armature|T-Pose",
//     "Armature|Walk",
//     "Armature|Walk2"
// ]
export const zombieEntityMetaData: EntityMetaDataInterface = entityMedataFactory({
  ["@type"]: JsonLdTypeFactory(appLdType.entityCharacter, "zombie"),
  label: "Zombie",
  asset: {
    model3d: asset,
    icon: iconFarmerSrc,
    animationMapper: {
      [EntityState.move]: "Armature|Walk",
      [EntityState.wait]: "Armature|Idle",
      [EntityState.attack]: "Armature|Attack",
    },
  },
  propriety: {
    speed: 0.01,
    attack: {
      damage: 1,
      attackRange: 1,
      attackSpeed: 60,
    },
  },
  defaultEntity: () => {
    const action = ZombieAttackActionMetadata.factory()
    const actionBag: ActionBagInterface = {}
    addAction(actionBag, action)

    return {
      actions: actionBag,
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

enum ZombieAttackState {
  FindEnemy = "FindEnemy",
  GoToEnemy = "GoToEnemy",
  AttackEnnemy = "AttackEnnemy",
}

interface ZombieAttackAction {
  state: ZombieAttackState
}

export const ZombieAttackActionMetadata: ActionMetadataInterface<ZombieAttackAction> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.action, "ZombieAttack"),
    onFrame: ({ game, entity, action }) => {
      if (!entity) return
      const data = action.data

      const enemy = entity.entityAttackTargetIri
        ? getEntityInGameByIri(game, entity.entityAttackTargetIri)
        : undefined
      if (!enemy) data.state = ZombieAttackState.FindEnemy

      if (data.state === ZombieAttackState.FindEnemy) {
        const newEnemy = findClosestInGame(
          entity,
          towerEntityMetaData["@type"],
          game,
        )
        if (!newEnemy) return

        const distance = distanceBetweenVector3(entity.position, newEnemy.position)
        if (distance > 15) return

        entity.entityAttackTargetIri = newEnemy["@id"]
        data.state = ZombieAttackState.GoToEnemy
      }

      if (enemy && data.state === ZombieAttackState.GoToEnemy) {
        const result = entityGoToEntityWithGround(entity, enemy, game)
        if (result?.unreachable) {
          return
        }

        if (entityCanBeAttackEntity(entity, enemy)) {
          data.state = ZombieAttackState.AttackEnnemy
        }
      }

      if (enemy && data.state === ZombieAttackState.AttackEnnemy) {
        const metaData = getMetaData<EntityMetaDataInterface>(entity)
        entityAttackEntity(entity, enemy)
        action.nextTick = game.time + metaData.propriety.attack?.attackSpeed
      }
    },
    factory: () => {
      const data: ZombieAttackAction = {
        state: ZombieAttackState.FindEnemy,
      }

      return jsonLdFactory(ZombieAttackActionMetadata["@type"], { data })
    },
  }
