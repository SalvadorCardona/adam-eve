import { ContainerInterface } from "@/packages/container/container"
import EntityInterface from "@/app/game/domain/EntityInterface"

export default interface GameInterfaceInterface
  extends ContainerInterface<EntityInterface> {}
