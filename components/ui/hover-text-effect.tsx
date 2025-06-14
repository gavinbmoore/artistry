"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string
  duration?: number
  automatic?: boolean
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="20%" stopColor="#ef4444" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="80%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0.1, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Base text - always visible with stroke */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent stroke-green-200 font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>

      {/* Animated stroke text */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent stroke-green-300 font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Colorful gradient text with mask - only visible on hover */}
      {hovered && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#textGradient)"
          mask="url(#textMask)"
          className="font-[helvetica] text-7xl font-bold"
        >
          {text}
        </text>
      )}
    </svg>
  )
}
