import { useEffect, useState } from "react"

interface ImageData {
  ready: boolean
  width: number
  height: number
  image: HTMLImageElement | null
  ratio: number
  src: string
}

interface Output {
  imageData: ImageData
  setImageData: (src: string) => void
}

const useImageLoader = (src: string): Output => {
  const [imageData, setImageData] = useState<ImageData>({
    ready: false,
    x: 0,
    y: 0,
    image: null,
    ratio: 0,
    src,
  })

  function buildImage(newSrc: string) {
    const img = new Image()
    img.src = newSrc
    img.onload = () => {
      setImageData({
        ready: true,
        x: img.width,
        y: img.height,
        image: img,
        ratio: img.width / img.height,
        src,
      })
    }
    img.onerror = () => {
      setImageData({
        ready: false,
        x: 0,
        y: 0,
        image: null,
        ratio: 0,
        src,
      })
    }
  }

  useEffect(() => {
    buildImage(src)
  }, [src])

  return {
    imageData,
    setImageData: buildImage,
  }
}

export default useImageLoader
