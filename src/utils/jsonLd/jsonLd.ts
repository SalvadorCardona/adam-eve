import createUniqId from "@/src/utils/id/createUniqId"
import { JsonLdContainerInterface } from "@/src/container/container"

export type JsonLdIri = string
export type JsonLdType = string

export interface JsonTypedLdInterface {
  "@type": JsonLdType
}

export interface BaseJsonLdInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@version": number
}

export interface JsonLdCollection<T = BaseJsonLdInterface> {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@version": number
  collection: JsonLdContainerInterface<T>
  totalItems: number
}

export type JsonLDItem<T> = BaseJsonLdInterface & T

export function jsonLdFactory<T>(type: string, object: Partial<T>): JsonLDItem<T> {
  const jsonLdType = JsonLdTypeFactory(type)
  // @ts-ignore
  return {
    "@type": jsonLdType,
    "@id": JsonLdIriFactory(jsonLdType),
    "@version": 1,
    ...object,
  }
}

export function JsonLdTypeFactory(
  baseType: JsonLdType,
  nextType?: string,
): JsonLdType {
  if (!nextType) return baseType

  return baseType + "/" + nextType
}

export function JsonLdIriFactory(baseType: JsonLdType, iri?: string): JsonLdIri {
  const newIri = iri ?? createUniqId()

  return baseType + "/" + newIri
}
