// Hook pour utiliser le contexte Pixi
import { use } from "react"
import { PixiContext, PixiContextInterface } from "./PixiContext"

export const usePixiApp = (): Required<PixiContextInterface> => {
  const context = use(PixiContext)

  if (!context?.app) throw new Error("Pixi Context not found")

  // @ts-ignore is tested on the top
  return context
}
