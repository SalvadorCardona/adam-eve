import { JsonTypedLdInterface } from "@/packages/utils/jsonLd/jsonLd"

export interface MetaDataInterface extends JsonTypedLdInterface {
  asset?: {
    icon: string
  }
}
