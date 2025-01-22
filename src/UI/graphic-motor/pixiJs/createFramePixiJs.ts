import { Spritesheet, Texture } from "pixi.js"
import { SpritesheetData } from "pixi.js/lib/spritesheet/Spritesheet"

interface createFramePixiJsParams {
  image: string
}

interface createFramePixiJsResult {}

export function createFramePixiJs(params: createFramePixiJsParams): SpritesheetData {
  const height = 64
  const width = 64
  const length = 10
  const frames: Record<string, any> = {}

  for (let i = 0; i < length; i++) {
    frames["frame" + i] = {
      frame: { x: width * i, y: 0, w: width, h: height },
      sourceSize: { w: width, h: height },
      spriteSourceSize: { x: 0, y: 0, w: 960, h: 64 },
    }
  }

  return {
    frames: frames,
    meta: {
      image: params.image,
      format: "RGBA8888",
      size: { w: 128, h: 32 },
      scale: 1,
    },
    animations: {
      main: Object.keys(frames), //array of frames by name
    },
  }
}

export function createSpritesheet(params: createFramePixiJsParams): Spritesheet {
  const frame = createFramePixiJs(params)
  const spriteSheet = new Spritesheet(
    Texture.from(frame.meta.image as string),
    frame,
  )
  spriteSheet.parse()

  return spriteSheet
}
