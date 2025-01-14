import { Text as TextBase, TextOptions, TextStyle } from "pixi.js"
import React from "react"
import { PixiDecorator } from "@/src/UI/graphic-motor/pixiJs/components/PixiDecorator"

interface GraphicsPropsInterface {
  text?: string
  options?: TextOptions
}

export const Text = ({ text, options }: GraphicsPropsInterface) => {
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    stroke: { color: "#4a1850", width: 5, join: "round" },
    dropShadow: {
      color: "#000000",
      blur: 4,
      angle: Math.PI / 6,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
  })

  const container = new TextBase({
    text: text ? text : "your text",
    ...options,
    style,
  })

  return <PixiDecorator container={container}></PixiDecorator>
}
