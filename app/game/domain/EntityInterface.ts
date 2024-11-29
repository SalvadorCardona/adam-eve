import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import { Vector2Interface } from "@/app/game/domain/Vector"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: Vector2Interface
  size: Vector2Interface
  life: number
}
