import { JsonTypedLdInterface } from "@/src/utils/jsonLd/jsonLd"

export interface BaseGameMetaDataInterface extends JsonTypedLdInterface {
  asset?: {
    icon?: string
    model3d?: string
    multiModel3d?: string[]
    model2d?: string
    multiModel2d?: string[]
    animationMapper?: Record<string, string>
  }
  label?: string
}
