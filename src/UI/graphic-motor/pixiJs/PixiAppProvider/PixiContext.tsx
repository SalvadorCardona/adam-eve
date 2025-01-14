// Créez le contexte
import { createContext } from "react"
import { Application } from "pixi.js"

interface PixiContextInterface {
  app: Application | undefined
}

export const PixiContext = createContext<PixiContextInterface>({ app: undefined })
