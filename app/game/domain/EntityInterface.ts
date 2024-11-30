import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector3Interface } from "@/app/game/domain/Vector"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector3Interface
  size: Vector3Interface
  life: number
  speed: number
}
