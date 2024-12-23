import React, { useEffect, useRef, useState } from "react"
import imageHandSrc from "./hand.png"
import hammerSrc from "./hammer.png"
import useImageLoader from "@/src/hook/useImageLoader"
import useGameContext from "@/src/UI/provider/useGameContext"

interface MouseCursorPropsInterface {}

export const MouseCursor = ({}: MouseCursorPropsInterface) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [imageSrc, setImageSrc] = useState(imageHandSrc)
  const SIZE = 50 // Taille de l'image du curseur
  const { imageData, setImageData } = useImageLoader(imageSrc)
  const game = useGameContext().game

  useEffect(() => {
    if (game.userControl.entityShouldBeCreated && imageData.src != hammerSrc) {
      setImageSrc(hammerSrc)
    }
    if (!game.userControl.entityShouldBeCreated && imageData.src != imageHandSrc) {
      setImageSrc(imageHandSrc)
    }
  }, [game.userControl.entityShouldBeCreated])

  const updateMouse = (e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.top = `${e.clientY - SIZE / 2}px`
      cursorRef.current.style.left = `${e.clientX - SIZE / 2}px`
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMouse)
    document.body.style.cursor = "none" // Cache le curseur par défaut
    return () => {
      window.removeEventListener("mousemove", updateMouse)
      document.body.style.cursor = "auto" // Restaure le curseur par défaut
    }
  }, [])

  if (!imageData.ready) return <></>

  console.log(imageData)
  return (
    <div
      ref={cursorRef}
      style={{
        position: "absolute",
        pointerEvents: "none", // Assure que le curseur ne bloque pas les interactions
        zIndex: 1000, // Assure que le curseur est au-dessus des autres éléments
      }}
    >
      <img
        src={imageData.src}
        alt="mouse-cursor"
        style={{
          width: `${SIZE * imageData.ratio}px`,
          height: "auto",
          marginTop: `${(SIZE * imageData.ratio) / 2}px`,
          marginLeft: `${(SIZE * imageData.ratio) / 2}px`,
        }}
      />
    </div>
  )
}
