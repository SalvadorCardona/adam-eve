import EntityInterface from "@/src/game/entity/EntityInterface"
import { GroundNetwork } from "@/src/game/entity/entityGround/GroundInterface"

export interface GroundEntityInterface extends EntityInterface {
  roadNetwork: GroundNetwork
}
