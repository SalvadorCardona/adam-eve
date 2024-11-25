export type JsonLdIri = string
export type JsonLdType = string

export interface BaseJsonLdInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
}

export type JsonLDItem<T> = BaseJsonLdInterface & T