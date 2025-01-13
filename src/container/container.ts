import {
  BaseJsonLdInterface,
  JsonLdIri,
  JsonLDItem,
  JsonLdType,
  JsonTypedLdInterface,
} from "@/src/utils/jsonLd/jsonLd"

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

export function getByLdType<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdType: JsonLdType | JsonLdType[],
): Array<T> {
  const results: Array<T> = []

  if (typeof jsonLdType === "object") {
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

export function getByLdIri<T extends JsonTypedLdInterface = JsonTypedLdInterface>(
  container: ContainerInterface,
  jsonLdIri: JsonLdIri | JsonLdIri[],
): Array<T> {
  const results: Array<T> = []

  if (Array.isArray(jsonLdIri)) {
    jsonLdIri.forEach((iri) => {
      if (iri in container) {
        results.push(container[iri])
      }
    })
  } else {
    if (jsonLdIri in container) {
      results.push(container[jsonLdIri])
    }
  }

  return results
}
