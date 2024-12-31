import {
  EquirectangularReflectionMapping,
  LinearMipMapLinearFilter,
  NearestFilter,
  Texture,
  TextureLoader,
} from "three"

const pngLoader = new TextureLoader()

export function imageToTexture(path: string, type: string): Texture {
  let image = pngLoader.load(path)
  // options
  image.mapping = EquirectangularReflectionMapping
  image.magFilter = NearestFilter
  image.minFilter = LinearMipMapLinearFilter
  // image.format = true ? RGBFormat : RGBAFormat
  image.name = type ?? "unknow"

  return image
}
