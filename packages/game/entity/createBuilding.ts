import { createEntityResource } from "@/packages/game/entity/createEntityResource"
import {
  EntityResourceInterface,
  EntityType,
} from "@/packages/game/entity/EntityResourceInterface"
import { BaseGameResource } from "@/packages/game/BaseGameResource"

type EntityResourceConfig = Partial<BaseGameResource> &
  Partial<EntityResourceInterface>

export function createBuilding(
  resource: EntityResourceConfig,
): EntityResourceInterface {
  return createEntityResource({
    ...resource,
    entityType: EntityType.building,
  })
}

export function createCharacter(
  resource: EntityResourceConfig,
): EntityResourceInterface {
  return createEntityResource({
    ...resource,
    entityType: EntityType.character,
  })
}

export function createHarvestable(
  resource: EntityResourceConfig,
): EntityResourceInterface {
  return createEntityResource({
    ...resource,
    entityType: EntityType.resource,
  })
}
