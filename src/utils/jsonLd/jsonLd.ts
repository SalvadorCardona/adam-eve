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

export interface JsonLdIriCollection<T = BaseJsonLdInterface> {
  "@id": JsonLdIri
  "@type": JsonLdType
  "@version": number
  collection: JsonLdIriContainerInterface<T>
  totalItems: number
}

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

export enum ContainerAction {
  update = "update",
  remove = "remove",
  create = "create",
}

export function updateContainer<T extends BaseJsonLdInterface>(
  container: ContainerInterface<T>,
  item: T,
  action: ContainerAction = ContainerAction.update,
): void {
  if (action === ContainerAction.update || action === ContainerAction.create) {
    item["@version"]++
    container[item["@id"]] = item
  }

  if (action === ContainerAction.remove) {
    console.log(item["@id"])
    deleteContainerKey(container, item["@id"])
  }

  containerPubSub.publish(item["@id"], { item, action })
  containerPubSub.publish(item["@type"], { item, action })
}

export function getByLdType<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
  strict: boolean = false,
): Array<T> {
  const results: Array<T> = []
  const validator = (key: string, needle: string): boolean => {
    if (strict) {
      return key === needle
    }

    return key.startsWith(needle)
  }

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

export interface ContainerInterface<T = any> {
  [key: string]: T
}

export function deleteContainerKey<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
): void {
  delete container[key]
}
