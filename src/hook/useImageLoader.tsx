import { useEffect, useState } from "react"

interface ImageData {
  ready: boolean
  width: number
  height: number
  image: HTMLImageElement | null
}

const useImageLoader = (src: string): ImageData => {
  const [imageData, setImageData] = useState<ImageData>({
    ready: false,
    width: 0,
    height: 0,
    image: null,
  })

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageData({
        ready: true,
        width: img.width,
        height: img.height,
        image: img,
      })
    }
    img.onerror = () => {
      setImageData({
        ready: false,
        width: 0,
        height: 0,
        image: null,
      })
    }
  }, [src])

  return imageData
}

export default useImageLoader
