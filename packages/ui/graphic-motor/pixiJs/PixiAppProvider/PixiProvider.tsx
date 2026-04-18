import React, { PropsWithChildren, useEffect, useState } from "react"
import {
  Application as PixiApplication,
  ApplicationOptions,
  Assets,
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Sprite as PixiSprite,
  TilingSprite as PixiTilingSprite,
  AnimatedSprite as PixiAnimatedSprite,
} from "pixi.js"
import {
  Application,
  extend,
  useApplication,
} from "@pixi/react"
import { PixiContainerProvider } from "@/packages/ui/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import { EntityResourceInterface } from "@/packages/game/entity/EntityResourceInterface"
import { getByLdTypeIn } from "@/packages/jsonLd/jsonLd"
import { assetList } from "@/app/assetList"
import { metaDataRegistered } from "@/packages/resource/ResourceInterface"
import LoaderComponent from "@/app/components/LoaderComponent"

extend({
  Container: PixiContainer,
  Graphics: PixiGraphics,
  Sprite: PixiSprite,
  TilingSprite: PixiTilingSprite,
  AnimatedSprite: PixiAnimatedSprite,
})

export const PixiProvider: React.FC<{
  children: React.ReactNode
  options: Partial<ApplicationOptions>
}> = ({ children, options }) => {
  const [assetsReady, setAssetsReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const assets: string[] = []
      getByLdTypeIn<EntityResourceInterface>(metaDataRegistered, "entity").forEach(
        (e) => {
          e.asset?.model2d && assets.push(e.asset.model2d)
          if (e.asset?.asset2d) e.asset.asset2d.forEach((a) => assets.push(a))
        },
      )

      for (const asset of assets) {
        await Assets.load(asset)
      }

      Assets.addBundle("main", assetList)
      await Assets.loadBundle("main")

      if (!cancelled) {
        setAssetsReady(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (!assetsReady) return <LoaderComponent />

  return (
    <Application {...(options as any)}>
      <StageBoot>
        <PixiContainerProvider>{children}</PixiContainerProvider>
      </StageBoot>
    </Application>
  )
}

const StageBoot = ({ children }: PropsWithChildren) => {
  const { app } = useApplication()

  useEffect(() => {
    if (!app) return
    app.stage.interactive = true
    app.stage.eventMode = "static"
  }, [app])

  return <>{children}</>
}

export { useApplication as usePixiAppInternal } from "@pixi/react"
