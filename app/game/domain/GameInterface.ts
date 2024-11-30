import { JsonLdContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/game/domain/EntityInterface"

export default interface GameInterface {
  time: 0
  entities: JsonLdContainerInterface<EntityInterface>
}

export function gameFactory(): GameInterface {
  return {
    time: 0,
    entities: {},
  }
}
