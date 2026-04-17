import { useApplication } from "@pixi/react"
import { Application } from "pixi.js"

export const usePixiApp = (): { app: Application } => {
  const { app } = useApplication()

  if (!app) throw new Error("Pixi Context not found")

  return { app: app as Application }
}
