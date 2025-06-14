"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowingEffectProps {
  children: ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function GlowingEffect({
  children,
  className,
  glowColor = "rgba(34, 197, 94, 0.5)",
  intensity = 1,
}: GlowingEffectProps) {
  return (
    <motion.div
      className={cn("relative group cursor-pointer", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glowing background */}
      <div
        className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
        style={{
          background: `linear-gradient(45deg, ${glowColor}, transparent, ${glowColor})`,
          filter: `blur(${intensity * 4}px)`,
        }}
      />

      {/* Content */}
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700/50 p-6 transition-all duration-300 group-hover:border-green-500/50">
        {children}
      </div>
    </motion.div>
  )
}
