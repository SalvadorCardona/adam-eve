import { ContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/game/domain/EntityInterface"

export default interface GameInterfaceInterface {
  time: 0
  entities: ContainerInterface<EntityInterface>
}

export function gameFactory(): GameInterfaceInterface {
  return {
    time: 0,
    entities: {}
  }
}