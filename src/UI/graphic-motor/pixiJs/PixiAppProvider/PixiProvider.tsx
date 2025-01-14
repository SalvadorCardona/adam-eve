import React, { useEffect, useRef, useState } from "react"
import { Application, ApplicationOptions } from "pixi.js"
import { PixiContext } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/PixiContext"
import LoaderComponent from "@/components/LoaderComponent"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/PixiAppProvider/UsePixiApp"
import { PixiContainerProvider } from "@/src/UI/graphic-motor/pixiJs/ContainerProvider/ContainerProvider"

export const PixiProvider: React.FC<{
  children: React.ReactNode
  options: Partial<ApplicationOptions>
}> = ({ children, options }) => {
  const [application, setApplication] = useState<Application | undefined>(undefined)

  async function initPixiJs(options: Partial<ApplicationOptions>) {
    const app = new Application()

    await app.init(options)

    app.stage.eventMode = "static"

    return app
  }

  useEffect(() => {
    if (!application) {
      initPixiJs(options).then((app) => {
        setApplication(app)
      })
    }
    return () => {
      // if (application) {
      //   application.destroy(true, { children: true })
      // }
    }
  }, [options])

  if (!application) return <LoaderComponent></LoaderComponent>

  return (
    <PixiContext.Provider value={{ app: application }}>
      <Canvas></Canvas>
      <PixiContainerProvider>{children}</PixiContainerProvider>
    </PixiContext.Provider>
  )
}

const Canvas = () => {
  const current = usePixiApp()
  const div = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (div?.current && current.app?.canvas) {
      div.current.appendChild(current.app.canvas)
    }
  }, [current.app])
  if (!current.app) return

  return <div ref={div}></div>
}
