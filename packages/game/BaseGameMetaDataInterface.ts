import { SpritesheetData } from "pixi.js/lib/spritesheet/Spritesheet"
import { SpriteAnimation } from "@/packages/UI/graphic-motor/pixiJs/components/Sprite"
import { EntityState } from "@/packages/game/entity/EntityState"
import { MetadataInterface } from "@/packages/metadata/MetadataInterface"

export interface BaseGameMetaDataInterface extends MetadataInterface {
  asset?: {
    icon?: string
    model2d?: string
    asset2d?: string[]
    animationMapper?: Partial<Record<EntityState, SpritesheetData | SpriteAnimation>>
  }
  label?: string
}
