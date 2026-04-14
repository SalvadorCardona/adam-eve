import {
  getLdIri,
  JsonLdIri,
  JsonLdType,
  JsonLdTypeContainerInterface,
} from "@/packages/jsonLd/jsonLd"

export type MetadataInterface = { "@id": JsonLdIri }
type MetadataAble = JsonLdType | MetadataInterface

export const metaDataRegistered: JsonLdTypeContainerInterface<MetadataInterface> = {}

const addMetaData = (metaData: MetadataInterface) => {
  metaDataRegistered[metaData["@id"]] = metaData
}

export function getResource<T = MetadataInterface>(
  metaType: MetadataAble,
): T | undefined {
  const id = getLdIri(metaType)
  if (id && metaDataRegistered[id]) return metaDataRegistered[id] as T

  return undefined
}

export function metaDataFactory<T extends MetadataInterface = MetadataInterface>(
  metaData: T,
): T {
  if (!metaData["@id"]) {
    const message = "The @id is not defined"
    console.error(message, metaData)
    throw new Error(message)
  }

  addMetaData(metaData)

  return metaData
}
