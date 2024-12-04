import {
  EquirectangularReflectionMapping,
  LinearMipMapLinearFilter,
  NearestFilter,
  Texture,
  TextureLoader,
} from "three"

const pngLoader = new TextureLoader()

export function imgLoader(path: string, type: string | null = null): Texture {
  let image = pngLoader.load(path)
  // options
  image.mapping = EquirectangularReflectionMapping
  image.magFilter = NearestFilter
  image.minFilter = LinearMipMapLinearFilter

  return image
}
