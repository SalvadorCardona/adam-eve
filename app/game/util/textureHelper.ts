import { EquirectangularReflectionMapping, LinearMipMapLinearFilter, NearestFilter, TextureLoader } from "three"
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated"

const pngLoader = new TextureLoader()

export function imgLoader(path, type) {
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


