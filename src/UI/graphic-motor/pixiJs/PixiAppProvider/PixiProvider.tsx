import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import { Application, ApplicationOptions, Assets } from "pixi.js"
import { PixiContext } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiContext"
import LoaderComponent from "@/components/LoaderComponent"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { PixiContainerProvider } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import configGame from "@/src/game/game/app/configGame"
import { appLdType } from "@/src/AppLdType"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import { getByLdTypeIn } from "@/src/utils/jsonLd/jsonLd"
import { assetList } from "@/src/app/assetList"

export const PixiProvider: React.FC<{
  children: React.ReactNode
  options: Partial<ApplicationOptions>
}> = ({ children, options }) => {
  const applicationRef = useRef<Application>(new Application())
  const mounted = useRef<boolean>(false)
  const [ready, setReady] = useState(false)

  async function initPixiJs(options: Partial<ApplicationOptions>) {
    const app = applicationRef.current
    await app.init(options)
    app.stage.interactive = true
    app.stage.eventMode = "static"

    const assets: string[] = []
    getByLdTypeIn<EntityMetaDataInterface>(configGame, appLdType.entity).forEach(
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

    return app
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      initPixiJs(options).then((app) => {
        setReady(true) // Mettre à jour l'état ready une fois l'application initialisée
      })
    }
    return () => {
      if (applicationRef.current && mounted.current && ready) {
        applicationRef.current.destroy(true, { children: true })
      }
    }
  }, [])

  if (!ready) return <LoaderComponent></LoaderComponent>

  return (
    <PixiContext.Provider value={{ app: applicationRef.current }}>
      <Canvas>
        <PixiContainerProvider>{children}</PixiContainerProvider>
      </Canvas>
    </PixiContext.Provider>
  )
}

const Canvas = ({ children }: PropsWithChildren) => {
  const current = usePixiApp()
  const canvasRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (current.app && canvasRef.current) {
      // Assurez-vous que le canvas est ajouté au DOM
      canvasRef.current.appendChild(current.app.canvas)
    }

    // Fonction de nettoyage pour retirer le canvas
    return () => {
      if (canvasRef.current && current.app) {
        canvasRef.current.removeChild(current.app.canvas)
      }
    }
  }, [current.app])

  return <div ref={canvasRef}>{children}</div>
}
