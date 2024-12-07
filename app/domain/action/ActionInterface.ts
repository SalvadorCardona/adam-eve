import { BaseJsonLdInterface } from "@/packages/utils/jsonLd/jsonLd"

export interface ActionInterface<T> extends BaseJsonLdInterface {
  data: T
}