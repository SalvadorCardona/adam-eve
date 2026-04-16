import { SpritesheetData } from "pixi.js/lib/spritesheet/Spritesheet"
import { SpriteAnimation } from "@/packages/ui/graphic-motor/pixiJs/components/Sprite"
import { EntityState } from "@/packages/game/entity/EntityState"
import { BaseJsonLdItemInterface, createJsonLd } from "@/packages/jsonLd/jsonLd"
import { createResource } from "@/packages/resource/ResourceInterface"
import GameInterface from "@/packages/game/game/GameInterface"

export interface CreateItemPayload<T> {
  item?: T
  resource?: BaseGameResource
  game?: GameInterface
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
  createItem?: (payload: CreateItemPayload<T>) => CreateItemPayload<T>
}

export function createResourceGame<T extends BaseGameResource>(
  resource: BaseGameResource,
): BaseGameResource {
  const newResource = { ...resource }

  newResource.createItem = (payload) => {
    const currentPayload = resource.createItem
      ? resource.createItem(payload)
      : payload

    currentPayload.item = createJsonLd(resource["@id"], currentPayload.item ?? {})

    return currentPayload
  }

  return createResource(newResource) as T
}
