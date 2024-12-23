import createUniqId from "@/src/utils/id/createUniqId"

export type JsonLdIri = string
export type JsonLdType = string

export interface JsonTypedLdInterface {
  "@type": JsonLdType
}

export interface BaseJsonLdInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
}

export type JsonLDItem<T> = BaseJsonLdInterface & T

export function jsonLdFactory<T>(type: string, object: Partial<T>): JsonLDItem<T> {
  // @ts-ignore
  return {
    "@type": type,
    "@id": type + "/" + createUniqId(),
    ...object,
  }
}
