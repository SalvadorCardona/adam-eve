import { describe, expect, it } from "vitest"
import {
  BaseJsonLdItemInterface,
  ContainerAction,
  containerPubSub,
  createJsonLd,
  createJsonLdCollection,
  createJsonLdIri,
  createJsonLdType,
  deleteContainerKey,
  getByLdTypeIn,
  getLdIri,
  getLdType,
  JsonLdIriContainerInterface,
  updateCollection,
  updateContainer,
  updateContainerByType,
  updateItem,
} from "@/packages/jsonLd/jsonLd"

describe("createJsonLd", () => {
  it("sets @type, @id and @version on a new item", () => {
    const item = createJsonLd<{ foo: string }>("thing", { foo: "bar" })

    expect(item["@type"]).toBe("thing")
    expect(item["@id"]).toMatch(/^thing\//)
    expect(item["@version"]).toBe(1)
    expect(item.foo).toBe("bar")
  })

  it("nested type via createJsonLdType", () => {
    expect(createJsonLdType("a")).toBe("a")
    expect(createJsonLdType("a", "b")).toBe("a/b")
  })

  it("createJsonLdIri appends given iri", () => {
    expect(createJsonLdIri("a", "42")).toBe("a/42")
  })
})

describe("updateItem", () => {
  it("increments @version and publishes on @id and @type channels", () => {
    const item = createJsonLd("thing", {})
    const versionBefore = item["@version"] ?? 0

    const received: string[] = []
    const byId = containerPubSub.subscribe(item["@id"], () => received.push("id"))
    const byType = containerPubSub.subscribe(item["@type"]!, () =>
      received.push("type"),
    )

    updateItem(item)

    expect(item["@version"]).toBe(versionBefore + 1)
    expect(received).toContain("id")
    expect(received).toContain("type")

    byId.unsubscribe()
    byType.unsubscribe()
  })

  it("skips @type channel when item has no @type", () => {
    const item: BaseJsonLdItemInterface = { "@id": "no-type/1" }
    const received: string[] = []
    const sub = containerPubSub.subscribe(item["@id"], () => received.push("id"))

    updateItem(item)

    expect(received).toEqual(["id"])
    expect(item["@version"]).toBe(1)
    sub.unsubscribe()
  })

  it("forwards the action to subscribers", () => {
    const item = createJsonLd("thing", {})
    let lastAction: ContainerAction | undefined
    const sub = containerPubSub.subscribe(item["@id"], (e) => {
      lastAction = e.action
    })

    updateItem(item, ContainerAction.remove)

    expect(lastAction).toBe(ContainerAction.remove)
    sub.unsubscribe()
  })
})

describe("updateContainer", () => {
  it("inserts the item keyed by @id on update", () => {
    const container: JsonLdIriContainerInterface<BaseJsonLdItemInterface> = {}
    const item = createJsonLd("thing", {})

    updateContainer(container, item)

    expect(container[item["@id"]]).toBe(item)
  })

  it("removes the item on remove action", () => {
    const container: JsonLdIriContainerInterface<BaseJsonLdItemInterface> = {}
    const item = createJsonLd("thing", {})
    updateContainer(container, item)

    updateContainer(container, item, ContainerAction.remove)

    expect(container[item["@id"]]).toBeUndefined()
  })
})

describe("updateContainerByType", () => {
  it("keys by @type instead of @id", () => {
    const container: Record<string, BaseJsonLdItemInterface> = {}
    const item = createJsonLd("alpha", {})

    updateContainerByType(container, item)

    expect(container["alpha"]).toBe(item)
  })
})

describe("updateCollection", () => {
  it("adds the item and updates totalItems", () => {
    const collection = createJsonLdCollection<BaseJsonLdItemInterface>("list")
    const item = createJsonLd("thing", {})

    updateCollection(collection, item)

    expect(collection.totalItems).toBe(1)
    expect(collection.member[item["@id"]]).toBe(item)
  })

  it("decrements totalItems on remove", () => {
    const collection = createJsonLdCollection<BaseJsonLdItemInterface>("list")
    const item = createJsonLd("thing", {})
    updateCollection(collection, item)

    updateCollection(collection, item, ContainerAction.remove)

    expect(collection.totalItems).toBe(0)
  })
})

describe("getByLdTypeIn", () => {
  it("returns items whose key starts with the given type", () => {
    const container = {
      "thing/1": { "@id": "thing/1" },
      "thing/2": { "@id": "thing/2" },
      "other/1": { "@id": "other/1" },
    }

    const things = getByLdTypeIn<BaseJsonLdItemInterface>(container, "thing")
    const both = getByLdTypeIn<BaseJsonLdItemInterface>(container, [
      "thing",
      "other",
    ])

    expect(things).toHaveLength(2)
    expect(both).toHaveLength(3)
  })
})

describe("getLdType / getLdIri", () => {
  it("getLdType returns the string as-is or reads @type", () => {
    expect(getLdType("a/b")).toBe("a/b")
    expect(getLdType({ "@id": "a/1", "@type": "a" })).toBe("a")
  })

  it("getLdIri returns the string as-is or reads @id", () => {
    expect(getLdIri("a/1")).toBe("a/1")
    expect(getLdIri({ "@id": "a/1" })).toBe("a/1")
  })
})

describe("deleteContainerKey", () => {
  it("deletes the given key", () => {
    const container: Record<string, number> = { a: 1, b: 2 }
    deleteContainerKey(container, "a")
    expect(container).toEqual({ b: 2 })
  })
})
