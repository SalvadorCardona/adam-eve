import {
  EquirectangularReflectionMapping,
  LinearMipMapLinearFilter,
  NearestFilter,
  Texture,
  TextureLoader
} from "three"
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated"

const pngLoader = new TextureLoader()

export function imgLoader(path: string, type: string | null = null): Texture {
  let image = pngLoader.load(path)
  // options
  image.mapping = EquirectangularReflectionMapping
  image.encoding = sRGBEncoding
  image.magFilter = NearestFilter
  image.minFilter = LinearMipMapLinearFilter

  return image
}


