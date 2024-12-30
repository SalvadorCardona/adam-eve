import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLDItem,
  JsonLdType,
  JsonTypedLdInterface,
} from "@/src/utils/jsonLd/jsonLd"

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

export function hasId<T>(container: ContainerInterface<T>, key: JsonLdIri): boolean {
  return key in container
}

export function updateContainer<T extends BaseJsonLdInterface>(
  container: ContainerInterface<T>,
  item: T,
  action: "update" | "remove" | "create" = "update",
): void {
  if (action === "update" || action === "create") {
    container[item["@id"]] = item
    return
  }
  if (action === "remove") {
    deleteContainerKey(container, item["@id"])
    return
  }
}

export function updateTypeContainer(
  container: JsonLdContainerInterface<object>,
  item: BaseJsonLdInterface,
): void {
  container[item["@type"]] = item
}

export function getByTypeInContainer<T>(
  container: JsonLdContainerInterface<T>,
  type: JsonLdType,
): T[] {
  return Object.values(container).filter((item) => item["@type"].startsWith(type))
}

export function getByLdType<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType,
): Array<T> {
  const results: Array<T> = []

  Object.keys(container).map((key) => {
    if (key.startsWith(jsonLdType)) {
      results.push(container[key])
    }
  })

  return results
}
