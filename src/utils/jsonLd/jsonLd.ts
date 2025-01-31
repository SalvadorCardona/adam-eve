import createUniqId from "@/src/utils/id/createUniqId"
import { createChannelPubSub } from "@/src/utils/functionnal/pubsub"

export const containerPubSub = createChannelPubSub<ContainerPublish>()

export interface ContainerPublish {
  item: BaseJsonLdInterface
  action: ContainerAction
}

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

export type JsonLDItem<T> = BaseJsonLdInterface & T

export interface JsonLdTypeContainerInterface<T = object> {
  [key: JsonLdType]: T
}

export interface JsonLdIriContainerInterface<T = object> {
  [key: JsonLdIri]: JsonLDItem<T>
}

export interface JsonLdIriCollection<T = BaseJsonLdInterface>
  extends BaseJsonLdInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@context": "collection"
  "@version": number
  collection: JsonLdIriContainerInterface<T>
  totalItems: number
}

function isJsonLdIriCollection(object: object): object is JsonLdIriCollection {
  return Object.hasOwn(object, "@context")
}

export function JsonLdIriCollectionFactory<T = JsonLdIriCollection>(
  type: JsonLdType,
  collections: JsonLdIriContainerInterface<T> = {},
): JsonLdIriCollection<T> {
  return jsonLdFactory<JsonLdIriCollection<T>>(type, {
    "@context": "collection",
    collection: collections,
    totalItems: 0,
  })
}

export function jsonLdFactory<T>(
  type: JsonLdType,
  object: Partial<T>,
): JsonLDItem<T> {
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

export enum ContainerAction {
  update = "update",
  remove = "remove",
  create = "create",
}

export function updateContainer<T extends BaseJsonLdInterface>(
  container: JsonLdIriContainerInterface<T>,
  item: T,
  action: ContainerAction = ContainerAction.update,
): void {
  container[item["@id"]] = item

  if (action === ContainerAction.remove) {
    deleteContainerKey(container, item["@id"])
  }

  updateItem(item, action)
}

export function updateContainerByType<T extends BaseJsonLdInterface>(
  container: JsonLdIriContainerInterface<T>,
  item: T,
  action: ContainerAction = ContainerAction.update,
): void {
  container[item["@type"]] = item

  if (action === ContainerAction.remove) {
    deleteContainerKey(container, item["@type"])
  }

  updateItem(item, action)
}

export function updateItem(
  item: JsonLDItem<any>,
  action: ContainerAction = ContainerAction.update,
): JsonLDItem<any> {
  item["@version"]++
  containerPubSub.publish(item["@id"], { item, action })
  containerPubSub.publish(item["@type"], { item, action })

  return item
}

export function updateCollection(
  collection: JsonLdIriCollection,
  item: JsonLDItem<any>,
  action: ContainerAction = ContainerAction.update,
): JsonLDItem<any> {
  updateContainer(collection.collection, item, action)
  collection.totalItems = Object.keys(collection.collection).length
  return updateItem(collection, action)
}

export function getByLdTypeIn<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
): Array<T> {
  const results: Array<T> = []
  const validator = (key: string, needle: string): boolean => key.startsWith(needle)

  if (Array.isArray(jsonLdType)) {
    Object.keys(container).forEach((key) => {
      if (jsonLdType.some((type) => validator(key, type))) {
        results.push(container[key])
      }
    })

    return results
  }

  Object.keys(container).map((key) => {
    if (validator(key, jsonLdType)) {
      results.push(container[key])
    }
  })

  return results
}

export function getByLdType<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
): Array<T> {
  const results: Array<T> = []
  const ldTypes: JsonLdType[] = []
  if (Array.isArray(jsonLdType)) {
    jsonLdType.forEach((e) => ldTypes.push(e))
  } else {
    ldTypes.push(jsonLdType)
  }

  Object.values(container).forEach((item) => {
    if (ldTypes.includes(item["@type"])) {
      results.push(item)
    }
  })

  return results
}

export interface ContainerInterface<T = any> {
  [key: string]: T
}

export function deleteContainerKey<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
): void {
  delete container[key]
}
