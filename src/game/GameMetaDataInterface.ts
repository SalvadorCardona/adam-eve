import { JsonTypedLdInterface } from "@/src/utils/jsonLd/jsonLd"

export interface GameMetaDataInterface extends JsonTypedLdInterface {
  asset?: {
    icon?: string
    model3d?: string
    model2d?: string
    animationMapper?: Record<string, string>
  }
  label?: string
}
