// Créez le contexte
import React, { createContext, use, useEffect } from "react"
import { ContainerChild } from "pixi.js/lib/scene/container/Container"
import { usePixiApp } from "@/src/UI/graphic-motor/pixiJs/components/UsePixiApp"

interface PixiContainerInterface {
  containers: ContainerChild[]
  currentContainer?: ContainerChild
  addChild: (containerChild: ContainerChild) => void
  removeChild: (containerChild: ContainerChild) => void
}

export const PixiContainer = createContext<PixiContainerInterface>({
  addChild(containerChild: ContainerChild): void {},
  removeChild(containerChild: ContainerChild): void {},
  containers: [],
})

interface PixiContainerProviderPropsInterface {
  currentContainer?: ContainerChild
  children?: React.ReactNode
}

export const PixiContainerProvider = ({
  currentContainer,
  children,
}: PixiContainerProviderPropsInterface) => {
  const app = usePixiApp().app
  if (!app) return

  const _currentContainer = currentContainer ?? app?.stage

  useEffect(() => {
    if (currentContainer && app) {
      app.stage.addChild(_currentContainer)

      return () => {
        app.stage.removeChild(_currentContainer)
      }
    }
  }, [currentContainer])

  const args: PixiContainerInterface = {
    addChild: (containerChild) => _currentContainer?.addChild(containerChild),
    removeChild: (containerChild) => {
      console.log(containerChild)
      _currentContainer?.removeChild(containerChild)
    },
    currentContainer: _currentContainer,
    containers: [],
  }

  return <PixiContainer.Provider value={args}>{children}</PixiContainer.Provider>
}

export const usePixiContainer = () => {
  return use(PixiContainer)
}
