"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface StickyNoteProps {
  id: string
  content: string
  initialX: number
  initialY: number
  onUpdate: (id: string, content: string) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  onDelete: (id: string) => void
}

export default function StickyNote({
  id,
  content,
  initialX,
  initialY,
  onUpdate,
  onUpdatePosition,
  onDelete,
}: StickyNoteProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const noteRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLTextAreaElement) return

    setIsDragging(true)
    const rect = noteRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Keep note within viewport bounds
      const maxX = window.innerWidth - 250
      const maxY = window.innerHeight - 200

      const boundedX = Math.max(0, Math.min(newX, maxX))
      const boundedY = Math.max(0, Math.min(newY, maxY))

      setPosition({ x: boundedX, y: boundedY })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        onUpdatePosition(id, position.x, position.y)
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, position, id, onUpdatePosition])

  // Random rotation for each note
  const randomRotation = Math.random() * 6 - 3 // -3 to 3 degrees

  return (
    <motion.div
      ref={noteRef}
      className="fixed z-40 w-60 h-48 cursor-move select-none"
      style={{
        left: position.x,
        top: position.y,
        perspective: "1000px",
      }}
      initial={{ scale: 0, rotateX: -90, rotateY: 10 }}
      animate={{
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: isDragging ? randomRotation * 2 : randomRotation,
      }}
      exit={{ scale: 0, rotateX: -90, rotateY: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 2,
        z: 20,
      }}
      whileTap={{
        scale: 0.98,
        rotateX: 5,
        rotateY: -2,
      }}
    >
      <div
        className="relative w-full h-full transform-gpu"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Shadow layers */}
        <div
          className="absolute inset-0 bg-lime-400/30 rounded-sm transform translate-x-2 translate-y-2 blur-sm"
          style={{ transform: "translateZ(-8px) rotateX(2deg)" }}
        />
        <div
          className="absolute inset-0 bg-lime-400/20 rounded-sm transform translate-x-4 translate-y-4 blur-md"
          style={{ transform: "translateZ(-16px) rotateX(4deg)" }}
        />

        {/* Main note body */}
        <motion.div
          className="relative w-full h-full bg-gradient-to-br from-lime-300 via-lime-300 to-lime-400 rounded-sm transform-gpu"
          style={{
            boxShadow: `
              0 4px 8px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            transform: "translateZ(0px)",
          }}
          animate={{
            boxShadow: isHovered
              ? `
                0 8px 16px rgba(0, 0, 0, 0.15),
                0 16px 32px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(0, 0, 0, 0.15)
              `
              : `
                0 4px 8px rgba(0, 0, 0, 0.1),
                0 8px 16px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-20 rounded-sm"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 60% 70%, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px, 30px 30px, 25px 25px, 35px 35px",
            }}
          />

          {/* Delete button */}
          <Button
            onClick={() => onDelete(id)}
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded-full z-10 shadow-lg transform hover:scale-110 transition-all duration-200"
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <X className="h-3 w-3" />
          </Button>

          {/* Note content */}
          <div className="p-4 h-full relative z-5">
            <Textarea
              value={content}
              onChange={(e) => onUpdate(id, e.target.value)}
              placeholder="Write your idea here..."
              className="w-full h-full bg-transparent border-none resize-none text-lime-900 placeholder:text-lime-700/70 focus:ring-0 focus:outline-none text-sm leading-relaxed cursor-text font-medium"
              style={{
                fontFamily: "cursive",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)",
              }}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>

          {/* 3D Tape effects */}
          <motion.div
            className="absolute -top-1 left-4 w-12 h-4 bg-gradient-to-b from-white/80 to-white/60 rounded-sm shadow-sm transform -rotate-12"
            style={{
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              transform: "translateZ(2px) rotateX(-10deg) rotateZ(-12deg)",
            }}
            animate={{
              rotateX: isHovered ? -15 : -10,
            }}
          />
          <motion.div
            className="absolute -top-1 right-4 w-12 h-4 bg-gradient-to-b from-white/80 to-white/60 rounded-sm shadow-sm transform rotate-12"
            style={{
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              transform: "translateZ(2px) rotateX(-10deg) rotateZ(12deg)",
            }}
            animate={{
              rotateX: isHovered ? -15 : -10,
            }}
          />

          {/* Corner curl effect */}
          <div
            className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-lime-400 to-lime-300 transform rotate-45 translate-x-3 translate-y-3 opacity-60"
            style={{
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
              transform: "translateZ(-1px) rotateX(45deg) rotateY(-45deg)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
