import { EquirectangularReflectionMapping, LinearMipMapLinearFilter, NearestFilter, TextureLoader } from "three"
import { Texture } from "three/src/textures/Texture"
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated"

const pngLoader = new TextureLoader()

export function imgLoader(path: string, type: string): Texture {
  let image

  if (type === "gif") {
    console.log("for later")
  } else {
    image = pngLoader.load(path)
  }

  // options
  image.mapping = EquirectangularReflectionMapping
  image.encoding = sRGBEncoding
  image.magFilter = NearestFilter
  image.minFilter = LinearMipMapLinearFilter

  return image
}


