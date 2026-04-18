import { Assets, Spritesheet, Texture } from "pixi.js"
import { SpritesheetData } from "pixi.js"

interface createFramePixiJsParams {
  image: string
  steps?: number
  width?: number
}

export function createFramePixiJs({
  image,
  steps: baseSteps,
  width: baseWidth,
}: createFramePixiJsParams): SpritesheetData {
  const frames: Record<string, any> = {}

  const totalWidth = baseWidth ?? 960
  const totalHeight = 64
  const steps = baseSteps ?? 10
  const itemWidth = totalWidth / steps

  for (let i = 0; i < steps; i++) {
    frames["frame" + i] = {
      // rotated: false,
      // trimmed: false,
      frame: { x: itemWidth * i, y: 0, w: 96, h: totalHeight },
      sourceSize: { w: 96, h: totalHeight },
      spriteSourceSize: { x: 0, y: 0, w: 96, h: totalHeight },
    }
  }

  return {
    frames: frames,
    meta: {
      image: image,
      format: "RGBA8888",
      size: { w: totalWidth, h: totalHeight },
      scale: 1,
    },
    animations: {
      main: Object.keys(frames), //array of frames by name
    },
  }
}

export async function createSpritesheet(
  params: createFramePixiJsParams,
): Promise<Spritesheet> {
  const frame = createFramePixiJs(params)
  const texture = await Assets.load<Texture>(frame.meta.image as string)
  const spriteSheet = new Spritesheet({ texture, data: frame })
  await spriteSheet.parse()

  return spriteSheet
}

export async function createSpritesheetByData(
  spriteSheetData: SpritesheetData,
): Promise<Spritesheet> {
  const texture = await Assets.load<Texture>(spriteSheetData.meta.image as string)
  const spriteSheet = new Spritesheet({ texture, data: spriteSheetData })
  await spriteSheet.parse()

  return spriteSheet
}
