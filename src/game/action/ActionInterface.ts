import { BaseJsonLdInterface } from "@/src/utils/jsonLd/jsonLd"

export interface ActionInterface<T> extends BaseJsonLdInterface {
  data: T
}
