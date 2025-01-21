import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import { Application, ApplicationOptions, Assets } from "pixi.js"
import { PixiContext } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiContext"
import LoaderComponent from "@/components/LoaderComponent"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { PixiContainerProvider } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"
import configGame from "@/src/game/game/app/configGame"
import { appLdType } from "@/src/AppLdType"
import { EntityMetaDataInterface } from "@/src/game/entity/EntityMetaDataInterface"
import waterTexture from "@/public/sprite/water.png?url"
import { getByLdType } from "@/src/utils/jsonLd/jsonLd"

export const PixiProvider: React.FC<{
  children: React.ReactNode
  options: Partial<ApplicationOptions>
}> = ({ children, options }) => {
  const applicationRef = useRef<Application | undefined>(undefined)
  const [ready, setReady] = useState(false) // Ajout de l'état ready

  async function initPixiJs(options: Partial<ApplicationOptions>) {
    const app = new Application()
    await app.init(options)
    app.stage.interactive = true
    app.stage.eventMode = "static"

    const assets: string[] = []
    getByLdType<EntityMetaDataInterface>(configGame, appLdType.entity).forEach(
      (e) => {
        e.asset?.model2d && assets.push(e.asset.model2d)
        e.asset?.model3d && assets.push(e.asset.model3d)
      },
    )

    for (const asset of assets) {
      await Assets.load(asset)
    }

    await Assets.load(waterTexture)

    return app
  }

  useEffect(() => {
    if (!applicationRef.current) {
      initPixiJs(options).then((app) => {
        applicationRef.current = app
        setReady(true) // Mettre à jour l'état ready une fois l'application initialisée
      })
    }
    return () => {
      if (applicationRef.current) {
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
