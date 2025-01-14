// Hook pour utiliser le contexte Pixi
import { use } from "react"
import { PixiContext } from "./PixiContext"

export const usePixiApp = () => {
  return use(PixiContext)
}
