import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityMedataFactory } from "@/src/game/entity/EntityMedataFactory"
import asset from "./Zombie.glb?url"
import iconFarmerSrc from "./img.png"
import { EntityFaction, EntityState } from "@/src/game/entity/EntityInterface"
import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { ActionBagInterface } from "@/src/game/action/ActionBagInterface"
import { addAction } from "@/src/game/action/addAction"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/src/game/entity/useCase/entityAttackEntity"
import { getMetaData } from "@/src/game/game/app/configGame"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"

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
      faction: EntityFaction.enemy,
      life: 50,
      size: {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      },
    }
  },
})

enum ZombieAttackState {
  FindEnemy = "FindEnemy",
  GoToEnemy = "GoToEnemy",
  attackEnemy = "attackEnemy",
}

interface ZombieAttackAction {
  state: ZombieAttackState
}

export const ZombieAttackActionMetadata: ActionMetadataInterface<ZombieAttackAction> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "ZombieAttack"),
    onFrame: ({ game, entity, action }) => {
      if (!entity) return
      const data = action.data
      const metaData = getMetaData<EntityMetaDataInterface>(entity)
      const attack = metaData.propriety.attack
      if (!attack) return

      const enemy = entityQueryFindOne(game, { "@id": entity.entityAttackTargetIri })
      if (!enemy) data.state = ZombieAttackState.FindEnemy

      if (data.state === ZombieAttackState.FindEnemy) {
        const newEnemy = entityQueryFindOne(game, {
          faction: EntityFaction.self,
          circleSearch: {
            center: entity.position,
            radius: 15,
          },
        })

        if (!newEnemy) {
          action.nextTick = game.time + 300
          return
        }

        entity.entityAttackTargetIri = newEnemy["@id"]
        data.state = ZombieAttackState.GoToEnemy
      }

      if (enemy && data.state === ZombieAttackState.GoToEnemy) {
        const result = entityGoToEntityWithGround(entity, enemy, game)
        if (result?.unreachable) {
          return
        }

        if (entityCanBeAttackEntity(entity, enemy)) {
          data.state = ZombieAttackState.attackEnemy
        }
      }

      if (enemy && data.state === ZombieAttackState.attackEnemy) {
        if (!entityAttackEntity(entity, enemy)) {
          data.state = ZombieAttackState.GoToEnemy
        }

        action.nextTick = game.time + attack.attackSpeed
      }
    },
    factory: () => {
      const data: ZombieAttackAction = {
        state: ZombieAttackState.FindEnemy,
      }

      return jsonLdFactory(ZombieAttackActionMetadata["@type"], { data })
    },
  }
