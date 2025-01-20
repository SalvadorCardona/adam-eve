import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLDItem,
  JsonLdType,
  JsonTypedLdInterface,
} from "@/src/utils/jsonLd/jsonLd"
import { createChannelPubSub } from "@/src/utils/functionnal/pubsub"

export const containerPubSub = createChannelPubSub<ContainerPublish>()

interface ContainerWithCache {
  "@cache": {
    version: number
  }
}

export interface ContainerInterface<T = any> {
  [key: string]: T
}

export interface JsonLdContainerInterface<T = object> {
  [key: JsonLdIri]: JsonLDItem<T>
}

export interface JsonLdTypeContainerInterface<T = object> {
  [key: JsonLdType]: T
}

export function deleteContainerKey<T>(
  container: ContainerInterface<T>,
  key: JsonLdIri,
): void {
  delete container[key]
}

export enum ContainerAction {
  update = "update",
  remove = "remove",
  create = "create",
}

export interface ContainerPublish {
  item: BaseJsonLdInterface
  action: ContainerAction
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
    deleteContainerKey(container, item["@id"])
  }
  containerPubSub.publish(item["@id"], { item, action })
  containerPubSub.publish(item["@type"], { item, action })
}

export function getByLdType<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
): Array<T> {
  const results: Array<T> = []

  if (Array.isArray(jsonLdType)) {
    Object.keys(container).forEach((key) => {
      if (jsonLdType.some((type) => key.startsWith(type))) {
        results.push(container[key])
      }
    })

    return results
  }

  Object.keys(container).map((key) => {
    if (key.startsWith(jsonLdType)) {
      results.push(container[key])
    }
  })

  return results
}
