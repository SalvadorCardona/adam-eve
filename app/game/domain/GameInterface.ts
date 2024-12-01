import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/game/domain/entity/EntityInterface"

export default interface GameInterface {
  time: 0
  entities: JsonLdContainerInterface<EntityInterface>
  entitySelection: EntityInterface | null
}

export function gameFactory(): GameInterface {
  return {
    entitySelection: null,
    time: 0,
    entities: {},
  }
}
