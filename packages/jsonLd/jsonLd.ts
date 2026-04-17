import createUniqId from "@/packages/id/createUniqId"
import { createChannelPubSub } from "coooking-pubsub"

export const containerPubSub = createChannelPubSub<ContainerPublish>()

export interface ContainerInterface<T = any> {
  [key: string]: T
}

export interface ContainerPublish {
  item: BaseJsonLdItemInterface
  action: ContainerAction
}

export type JsonLdIri = string
export type JsonLdType = string

export interface JsonTypedLdInterface {
  "@type": JsonLdType
}

export interface BaseJsonLdItemInterface {
  "@id": JsonLdIri
  "@type"?: JsonLdType
  "@version"?: number

  [key: string]: any
}

export type JsonLDItem<T> = BaseJsonLdItemInterface & T

export interface JsonLdTypeContainerInterface<T = object> {
  [key: JsonLdType]: T
}

export interface JsonLdIriContainerInterface<T = object> {
  [key: JsonLdIri]: JsonLDItem<T>
}

export interface JsonLdIriCollection<
  T = BaseJsonLdItemInterface,
> extends BaseJsonLdItemInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@context": "collection"
  "@version": number
  member: JsonLdIriContainerInterface<T>
  totalItems: number
}

export interface JsonLdTypeCollection<
  T = BaseJsonLdItemInterface,
> extends BaseJsonLdItemInterface {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@context": "collection"
  "@version": number
  member: JsonLdTypeContainerInterface<T>
  totalItems: number
}

export function updateCollection(
  collection: JsonLdIriCollection,
  item: JsonLDItem<any>,
  action: ContainerAction = ContainerAction.update,
): JsonLDItem<any> {
  updateContainer(collection.member, item, action)
  collection.totalItems = Object.keys(collection.member).length
  return updateItem(collection, action)
}

export function createJsonLdCollection<T = JsonLdIriCollection>(
  type: JsonLdType,
  collections: JsonLdIriContainerInterface<T> = {},
): JsonLdIriCollection<T> {
  return createJsonLd<JsonLdIriCollection<T>>(type, {
    "@context": "collection",
    member: collections ?? [],
    totalItems: Object.keys(collections).length,
  })
}

export function createJsonLd<T>(
  type: JsonLdType,
  object: Partial<T>,
): JsonLDItem<T> {
  const jsonLdType = createJsonLdType(type)
  // @ts-ignore
  return {
    "@type": jsonLdType,
    "@id": createJsonLdIri(jsonLdType),
    "@version": 1,
    ...object,
  }
}

export function createJsonLdType(
  baseType: JsonLdType,
  nextType?: string,
): JsonLdType {
  if (!nextType) return baseType

  return baseType + "/" + nextType
}

export function createJsonLdIri(baseType: JsonLdType, iri?: string): JsonLdIri {
  const newIri = iri ?? createUniqId()

  return baseType + "/" + newIri
}

export enum ContainerAction {
  update = "update",
  remove = "remove",
  create = "create",
}

export function updateContainer<T extends BaseJsonLdItemInterface>(
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

export function updateContainerByType<T extends BaseJsonLdItemInterface>(
  container: JsonLdTypeContainerInterface<T>,
  item: T,
  action: ContainerAction = ContainerAction.update,
): void {
  const type = item["@type"]
  if (!type) return
  container[type] = item

  if (action === ContainerAction.remove) {
    deleteContainerKey(container, type)
  }

  updateItem(item, action)
}

export function updateItem(
  item: JsonLDItem<any>,
  action: ContainerAction = ContainerAction.update,
): JsonLDItem<any> {
  item["@version"] = (item["@version"] ?? 0) + 1
  containerPubSub.publish(item["@id"], { item, action })
  if (item["@type"]) {
    containerPubSub.publish(item["@type"], { item, action })
  }

  return item
}

export function getByLdTypeIn<T = BaseJsonLdItemInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
): Array<T> {
  const results: Array<T> = []
  const jsonLdTypes = Array.isArray(jsonLdType) ? jsonLdType : [jsonLdType]

  Object.keys(container).forEach((key) => {
    if (jsonLdTypes.some((type) => key.startsWith(type))) {
      results.push(container[key])
    }
  })

  return results
}

export function deleteContainerKey<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
): void {
  delete container[key]
}

export type JsonLdTypeAble = JsonLdType | JsonLDItem<any>

export function getLdType(item: JsonLdTypeAble): JsonLdType {
  if (typeof item === "string") return item

  return item["@type"]
}

export type JsonLdIriAble = JsonLdIri | JsonLDItem<any>

export function getLdIri(item: JsonLdIriAble): JsonLdIri {
  if (typeof item === "string") return item

  return item["@id"]
}
