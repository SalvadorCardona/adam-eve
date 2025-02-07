import { createJsonLdType } from "@/src/utils/jsonLd/jsonLd"
import { appLdType } from "@/src/AppLdType"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { entityQueryFindOne } from "@/src/game/game/useCase/query/entityQuery"
import { EntityFaction } from "@/src/game/entity/EntityInterface"
import {
  entityAttackEntity,
  entityCanBeAttackEntity,
} from "@/src/game/entity/useCase/entityAttackEntity"
import { EntityState } from "@/src/game/entity/EntityState"
import { getMetaData } from "@/src/utils/metadata/MetadataInterface"
import { entityGoToEntityWithGround } from "@/src/game/entity/useCase/move/entityGoToEntity"
import { actionMetaDataFactory } from "@/src/game/action/actionMetaDataFactory"
import { updateNextTick } from "@/src/game/action/updateNextTick"

export const zombieAttackActionMetadata = actionMetaDataFactory({
  ["@type"]: createJsonLdType(appLdType.typeAction, "ZombieAttack"),
  onFrame: ({ game, entity, action }) => {
    if (!entity) return
    const enemy = entityQueryFindOne(game, { "@id": entity.entityAttackTargetIri })

    if (
      entity.state === EntityState.find_enemy ||
      entity.state === EntityState.wait
    ) {
      const newEnemy = entityQueryFindOne(game, {
        faction: EntityFaction.self,
        circleSearch: {
          center: entity.position,
          radius: 500,
        },
      })

      if (!newEnemy) {
        updateNextTick(game, action, 300)
        return
      }

      entity.entityAttackTargetIri = newEnemy["@id"]
      entity.state = EntityState.go_to_enemy
    }

    if (enemy && entity.state === EntityState.go_to_enemy) {
      entityGoToEntityWithGround({ game, entity, target: enemy })

      if (entityCanBeAttackEntity(entity, enemy)) {
        entity.state = EntityState.attack
      }
    }

    if (enemy && entity.state === EntityState.attack) {
      const metaData = getMetaData<EntityMetaDataInterface>(entity)
      const attack = metaData.propriety?.attack ?? 0
      if (!attack) return

      if (!entityAttackEntity(game, entity, enemy)) {
        entity.state = EntityState.go_to_enemy
      }

      updateNextTick(game, action, attack.attackSpeed)
    }
  },
})
