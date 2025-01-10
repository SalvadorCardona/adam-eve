import { ActionMetadataInterface } from "@/src/game/action/ActionEntityMetadataInterface"
import { jsonLdFactory, JsonLdTypeFactory } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { getMetaData } from "@/src/game/game/app/configGame"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityQueryFindOne } from "@/src/game/entity/useCase/query/entityQuery"
import { EntityFaction } from "@/src/game/entity/EntityInterface"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntityWithGround"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/src/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/src/game/entity/EntityState"

interface ZombieAttackAction {}

export const ZombieAttackActionMetadata: ActionMetadataInterface<ZombieAttackAction> =
  {
    ["@type"]: JsonLdTypeFactory(appLdType.typeAction, "ZombieAttack"),
    onFrame: ({ game, entity, action }) => {
      if (!entity) return
      const metaData = getMetaData<EntityMetaDataInterface>(entity)
      const attack = metaData.propriety.attack
      if (!attack) return
      const enemy = entityQueryFindOne(game, { "@id": entity.entityAttackTargetIri })

      if (!enemy) entity.state = EntityState.find_enemy

      if (entity.state === EntityState.find_enemy) {
        const newEnemy = entityQueryFindOne(game, {
          faction: EntityFaction.self,
          circleSearch: {
            center: entity.position,
            radius: 15,
          },
          order: {
            distance: "ASC",
          },
        })

        if (!newEnemy) {
          action.nextTick = game.time + 300
          return
        }

        entity.entityAttackTargetIri = newEnemy["@id"]
        entity.state = EntityState.go_to_enemy
      }

      if (enemy && entity.state === EntityState.go_to_enemy) {
        const result = entityGoToEntityWithGround(entity, enemy, game)
        console.log(result)
        if (result?.unreachable) {
          return
        }

        if (entityCanBeAttackEntity(entity, enemy)) {
          entity.state = EntityState.attack_enemy
        }
      }

      if (enemy && entity.state === EntityState.attack_enemy) {
        if (!entityAttackEntity(entity, enemy)) {
          entity.state = EntityState.go_to_enemy
        }

        action.nextTick = game.time + attack.attackSpeed
      }
    },
    factory: () => {
      const data: ZombieAttackAction = {
        state: EntityState.find_enemy,
      }

      return jsonLdFactory(ZombieAttackActionMetadata["@type"], { data })
    },
  }
