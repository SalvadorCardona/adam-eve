import React, { useEffect, useRef } from "react"
import image from "./hand.png"
import useImageLoader from "@/src/hook/useImageLoader"

interface MouseCursorPropsInterface {}

export const MouseCursor = ({}: MouseCursorPropsInterface) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const SIZE = 50 // Taille de l'image du curseur
  const imageContext = useImageLoader(image)

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

  if (!imageContext.ready) return <></>

  const ratio = imageContext.width / imageContext.height
  return (
    <div
      ref={cursorRef}
      style={{
        position: "absolute",
        width: `${SIZE * ratio}px`,
        height: `${SIZE}px`,
        backgroundImage: `url(${image})`, // Remplacez par le chemin de votre image
        backgroundSize: "cover",
        pointerEvents: "none", // Assure que le curseur ne bloque pas les interactions
        zIndex: 1000, // Assure que le curseur est au-dessus des autres éléments
      }}
    />
  )
}
