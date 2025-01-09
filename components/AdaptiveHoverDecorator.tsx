import React, { useState, useRef, useEffect, ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AdaptiveHoverDecoratorProps {
  children: ReactNode
  hoverElement: ReactNode
}

export const AdaptiveHoverDecorator: React.FC<AdaptiveHoverDecoratorProps> = ({
  children,
  hoverElement,
}) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight
          setPosition(rect.bottom > windowHeight / 2 ? 'top' : 'bottom')
        }
      },
      { threshold: 1.0 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div ref={containerRef}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side={position} className="max-w-xs">
          {hoverElement}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

