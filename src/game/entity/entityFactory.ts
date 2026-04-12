import { createJsonLd, JsonLdType } from "@/packages/jsonLd/jsonLd"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import EntityInterface, {
  EntityFaction,
  isBuildingEntity,
  isCharacterEntity,
  isGroundEntity,
} from "@/src/game/entity/EntityInterface"
import { EntityState } from "@/src/game/entity/EntityState"
import { roundVectorToDown } from "@/packages/math/round"
import { getMetaData } from "@/packages/metadata/MetadataInterface"
import GameInterface from "@/src/game/game/GameInterface"
import { createVector3 } from "@/packages/math/vector"
import { playerMetadata } from "@/src/game/player/playerMetadata"
import { addActionToEntity } from "@/src/game/action/ActionInterface"
import { ActionMetadataInterface } from "@/src/game/action/ActionMetadataInterface"

export function entityFactory<
  T extends EntityInterface = EntityInterface,
>(payload?: { entity?: Partial<T>; game: GameInterface }): T {
  let ldType: JsonLdType = "undefined"

  if (payload?.entity?.["@type"]) ldType = payload.entity["@type"]
  // @ts-ignore
  if (this && this["@type"]) ldType = this["@type"]
  if (ldType === "undefined") console.warn("Has not Type", payload?.entity)

  const metaData = getMetaData<EntityMetaDataInterface>(ldType)

  const baseEntity: Partial<EntityInterface> = {
    rotation: 0,
    createdAt: payload?.game?.time ?? 0,
    position: createVector3(0, 0, 0),
    ...(metaData?.defaultEntity ? metaData?.defaultEntity() : {}),
    ...(payload?.entity ?? {}),
  }

  baseEntity.position.y = 1

  if (baseEntity.createdBy === undefined) {
    baseEntity.createdBy = playerMetadata.getPlayer()["@id"]
  }

  if (metaData?.propriety?.health) {
    baseEntity.life = metaData.propriety.health.maxLife
  }

  if (!baseEntity.size) {
    baseEntity.size = metaData?.propriety?.size ?? createVector3(1, 1, 1)
  }

  const entity = createJsonLd<EntityInterface>(ldType, baseEntity) as T

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
      const action = getMetaData<ActionMetadataInterface<any>>(actionType).factory({
        entity,
      })
      addActionToEntity(entity, action)
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
