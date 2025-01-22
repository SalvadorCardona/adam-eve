import { JsonTypedLdInterface } from "@/src/utils/jsonLd/jsonLd"
import { SpritesheetData } from "pixi.js/lib/spritesheet/Spritesheet"
import { SpriteAnimation } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { EntityState } from "@/src/game/entity/EntityState"

export interface BaseGameMetaDataInterface extends JsonTypedLdInterface {
  asset?: {
    icon?: string
    model3d?: string
    multiModel3d?: string[]
    model2d?: string
    multiModel2d?: string[]
    animationMapper?: Partial<Record<EntityState, SpritesheetData | SpriteAnimation>>
  }
  label?: string
}
