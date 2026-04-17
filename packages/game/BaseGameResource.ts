import { SpritesheetData } from "pixi.js"
import { SpriteAnimation } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
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

export interface BaseGameResource<
  T extends BaseJsonLdItemInterface = BaseJsonLdItemInterface,
> extends BaseJsonLdItemInterface {
  asset?: {
    icon?: string
    model2d?: string
    asset2d?: string[]
    animationMapper?: Partial<Record<EntityState, SpritesheetData | SpriteAnimation>>
  }
  label?: string
  createItem: (payload?: CreateItemPayload<T>) => T
  factory: (payload?: any) => T
}

export function createResourceGame<T extends BaseGameResource>(
  resource: Partial<BaseGameResource> & Partial<T> & { "@id"?: string; "@type"?: string },
): T {
  const newResource = { ...resource } as BaseGameResource

  const originalCreateItem = resource.createItem

  newResource.createItem = (payload = {}) => {
    const resourceType = newResource["@type"] ?? newResource["@id"]
    if (originalCreateItem) {
      const result: any = originalCreateItem({
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

  newResource.factory = (item: any = {}) => {
    return newResource.createItem({ item })
  }

  return createResource(newResource) as T
}
