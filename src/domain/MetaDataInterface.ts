import { JsonTypedLdInterface } from "@/packages/utils/jsonLd/jsonLd"

export interface MetaDataInterface extends JsonTypedLdInterface {
  asset?: {
    icon?: string
    model3d?: string
    model2d?: string
  }
}
