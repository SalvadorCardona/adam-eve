import { useEffect, useState } from "react"
import { Assets, Texture } from "pixi.js"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { usePixiContainer } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"

export const useTexture = ({
  textureSrc,
  container,
}: {
  textureSrc: string
  container?: { texture?: Texture }
}): {
  isReady: boolean
  texture: Texture | undefined
} => {
  const [texture, setTexture] = useState<Texture | undefined>(undefined)
  const [isReady, setIsReady] = useState<boolean>(false)
  useEffect(() => {
    const loadTexture = async () => {
      return Assets.load(textureSrc)
    }

    loadTexture().then((e) => {
      setTexture(e)
      setIsReady(true)
    })
  }, [textureSrc])

  useEffect(() => {
    if (container && texture) {
      container.texture = texture
    }
  }, [texture, container])

  return { texture, isReady }
}
export const usePixiInstance = ({ container }: { container: ContainerChild }) => {
  const pixiContainer = usePixiContainer()

  useEffect(() => {
    pixiContainer.addChild(container)
    return () => {
      pixiContainer.removeChild(container)
    }
  }, [container])
}
