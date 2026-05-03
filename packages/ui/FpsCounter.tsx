import React, { useEffect, useState } from "react"

export default function FpsCounter() {
  const [fps, setFps] = useState(0)

  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let rafId = 0

    const loop = (now: number) => {
      frames++
      const elapsed = now - last
      if (elapsed >= 500) {
        setFps(Math.round((frames * 1000) / elapsed))
        frames = 0
        last = now
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafId)
  }, [])

  const color =
    fps >= 50
      ? "text-emerald-700"
      : fps >= 30
        ? "text-amber-700"
        : "text-rose-700"

  return (
    <div className="bg-amber-100 px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1 font-medium">
      <span className={color}>{fps}</span>
      <span className="text-amber-800 text-sm">fps</span>
    </div>
  )
}
