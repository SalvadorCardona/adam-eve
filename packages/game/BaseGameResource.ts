import { EntityState } from "@/packages/game/entity/EntityState"
import { BaseJsonLdItemInterface, createJsonLd } from "@/packages/jsonLd/jsonLd"
import { createResource } from "@/packages/resource/ResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"

export interface CreateItemPayload<T extends BaseJsonLdItemInterface> {
  item?: Partial<T>
  entity?: Partial<T>
  resource?: BaseGameResource
  game?: GameInterface
  [key: string]: any
}

export interface AssetInterface {
  icon?: string
  model2d?: string
  asset2d?: string[]
  animationMapper?: Partial<Record<EntityState, unknown>>
}

export interface BaseGameResource<
  T extends BaseJsonLdItemInterface = BaseJsonLdItemInterface,
> extends BaseJsonLdItemInterface {
  asset?: AssetInterface
  label?: string
  create: (payload?: CreateItemPayload<T>) => T
}

export function createResourceGame<T extends BaseGameResource>(
  resource: Partial<BaseGameResource> & Partial<T> & { "@id"?: string; "@type"?: string },
): T {
  const newResource = { ...resource } as BaseGameResource

  const originalCreate = resource.create

  newResource.create = (payload = {}) => {
    const resourceType = newResource["@type"] ?? newResource["@id"]
    if (originalCreate) {
      const result: any = originalCreate({
        ...payload,
        resource: newResource,
      })
      if (result && result["@id"]) return result
      const base = (result && (result.item ?? result.entity)) ?? payload.item ?? payload.entity ?? {}
      return createJsonLd(resourceType, base) as any
    }

    const base = payload.item ?? payload.entity ?? {}
    return createJsonLd(resourceType, base) as any
  }

  return createResource(newResource) as T
}
