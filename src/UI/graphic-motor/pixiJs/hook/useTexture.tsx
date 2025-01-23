import { useEffect, useState } from "react"
import { Assets, Texture, Ticker } from "pixi.js"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { usePixiContainer } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import { SpriteAnimation } from "@/src/UI/graphic-motor/pixiJs/components/Sprite"
import { Sprite as BaseSprite } from "pixi.js/lib/scene/sprite/Sprite"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"

export const useTexture = ({
  textureSrc,
  container,
}: {
  textureSrc?: string
  container?: { texture?: Texture }
}): {
  isReady: boolean
  texture: Texture | undefined
} => {
  const [texture, setTexture] = useState<Texture | undefined>(undefined)
  const [isReady, setIsReady] = useState<boolean>(false)
  useEffect(() => {
    const loadTexture = async () => {
      return textureSrc && Assets.load(textureSrc)
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

export const usePixiAnimation = ({
  animation,
  container,
}: {
  animation?: SpriteAnimation
  container: ContainerChild
}) => {
  const app = usePixiApp().app

  useEffect(() => {
    if (!animation || !container) return

    const animate = (e: Ticker) => {
      animation(e, container as BaseSprite)
    }

    app.ticker.add(animate)

    return () => {
      app.ticker.remove(animate)
    }
  }, [animation])
}
