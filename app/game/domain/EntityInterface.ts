import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"
import VectorInterface from "@/app/game/domain/Vector"

export default interface EntityInterface extends BaseJsonLdInterface {
  position: VectorInterface
  life: number
}
