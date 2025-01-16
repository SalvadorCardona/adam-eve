// Créez le contexte
import { createContext } from "react"
import { Application } from "pixi.js"

export interface PixiContextInterface {
  app?: Application
}

export const PixiContext = createContext<PixiContextInterface>({ app: undefined })
