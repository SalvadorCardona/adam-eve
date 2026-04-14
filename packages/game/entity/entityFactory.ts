import { createJsonLd } from "@/packages/jsonLd/jsonLd"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import EntityInterface, {
  EntityFaction,
  isBuildingEntity,
  isCharacterEntity,
  isGroundEntity,
} from "@/packages/game/entity/EntityInterface"
import { EntityState } from "@/packages/game/entity/EntityState"
import { roundVectorToDown } from "@/packages/math/round"
import { getResource } from "@/packages/metadata/MetadataInterface"
import GameInterface from "@/packages/game/game/GameInterface"
import { createVector3 } from "@/packages/math/vector"
import { playerMetadata } from "@/packages/game/player/playerMetadata"
import { addActionToEntity } from "@/packages/game/action/ActionInterface"
import { ActionResourceInterface } from "@/packages/game/action/ActionResourceInterface"

export function entityFactory<T extends EntityInterface = EntityInterface>(payload: {
  entity?: Partial<T>
  game: GameInterface
  resource: EntityResourceInterface
}): T {
  const metaData = getResource<EntityResourceInterface>(payload.resource["@id"])

  const baseEntity: Partial<EntityInterface> = {
    rotation: 0,
    createdAt: payload?.game?.time ?? 0,
    position: createVector3(0, 1, 0),
    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  if (baseEntity.createdBy === undefined) {
    baseEntity.createdBy = playerMetadata.getPlayer()["@id"]
  }

  if (metaData?.propriety?.health) {
    baseEntity.life = metaData.propriety.health.maxLife
  }

  if (!baseEntity.size) {
    baseEntity.size = metaData?.propriety?.size ?? createVector3(1, 1, 1)
  }

  const entity = createJsonLd<EntityInterface>("entity", baseEntity) as T

  entity.position = roundVectorToDown(entity.position)

  if (isBuildingEntity(entity)) {
    entity.state = metaData?.propriety?.resourceForConstruction
      ? EntityState.under_construction
      : EntityState.builded
  }

  if (isCharacterEntity(entity) || isBuildingEntity(entity)) {
    entity.faction = entity?.faction ? entity.faction : EntityFaction.self
  }

  if (metaData?.propriety?.defaultActions) {
    metaData.propriety.defaultActions.forEach((actionType) => {
      const action = getResource<ActionResourceInterface>(actionType)?.factory({
        entity,
      })

      action && addActionToEntity(entity, action)
    })
  }

  if (isCharacterEntity(entity)) {
    entity.state = EntityState.wait
  }

  if (isGroundEntity(entity)) {
    entity.position.y = 0
  }

  return entity
}
