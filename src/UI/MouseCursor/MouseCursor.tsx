import React, { useEffect, useRef, useState } from "react"

import useImageLoader from "@/src/utils/react/hook/useImageLoader"
import useGameContext from "@/src/UI/provider/useGameContext"
import { mouseIcon } from "@/src/UI/MouseCursor/MouseIcon"

interface MouseCursorPropsInterface {}

export const MouseCursor = ({}: MouseCursorPropsInterface) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [imageSrc, setImageSrc] = useState(mouseIcon.normal)
  const SIZE = 50 // Taille de l'image du curseur
  const { imageData, setImageData } = useImageLoader(imageSrc)
  const gameContext = useGameContext()
  const game = gameContext.game

  useEffect(() => {
    if (game.userControl.currentAction?.mouseIcon) {
      setImageSrc(game.userControl.currentAction?.mouseIcon)
      return
    }

    setImageSrc(mouseIcon.normal)
  }, [game.userControl.currentAction])

  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      game.camera.position.y += 0.1
    }
    if (e.deltaY < 0) {
      game.camera.position.y -= 0.1
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll)
    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [])

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
