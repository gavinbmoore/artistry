"use client"

import { useEffect, useState, useRef } from "react"

export default function ScrollBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const lastScrollY = useRef(0)

  // Array of color schemes to cycle through
  const colorSchemes = [
    { start: [0, 61, 43], end: [30, 200, 255] }, // Racing green to bright blue
    { start: [30, 200, 255], end: [147, 51, 234] }, // Bright blue to purple
    { start: [147, 51, 234], end: [236, 72, 153] }, // Purple to pink
    { start: [236, 72, 153], end: [251, 146, 60] }, // Pink to orange
    { start: [251, 146, 60], end: [34, 197, 94] }, // Orange to green
    { start: [34, 197, 94], end: [6, 182, 212] }, // Green to cyan
    { start: [6, 182, 212], end: [168, 85, 247] }, // Cyan to violet
    { start: [168, 85, 247], end: [239, 68, 68] }, // Violet to red
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current)

      // Change colors on significant scroll movement and direction change
      if (scrollDifference > 200) {
        const previousDirection = lastScrollY.current < scrollY ? "down" : "up"
        const currentDirection = currentScrollY > scrollY ? "down" : "up"

        // If direction changed significantly, advance color scheme
        if (previousDirection !== currentDirection && scrollDifference > 300) {
          setColorIndex((prev) => (prev + 1) % colorSchemes.length)
        }
      }

      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
    }

    // High-performance scroll handling - no throttling for maximum responsiveness
    const optimizedScroll = () => {
      handleScroll()
    }

    // Use passive listeners for better performance
    window.addEventListener("scroll", optimizedScroll, { passive: true })
    return () => window.removeEventListener("scroll", optimizedScroll)
  }, [scrollY, colorSchemes.length])

  // Calculate scroll progress within current section (0 to 1)
  const sectionHeight = typeof window !== "undefined" ? window.innerHeight : 1000
  const scrollProgress = Math.min((scrollY % sectionHeight) / sectionHeight, 1)

  // Get current color scheme
  const currentScheme = colorSchemes[colorIndex]

  // Interpolate between start and end colors with high precision
  const r = Math.round(currentScheme.start[0] + scrollProgress * (currentScheme.end[0] - currentScheme.start[0]))
  const g = Math.round(currentScheme.start[1] + scrollProgress * (currentScheme.end[1] - currentScheme.start[1]))
  const b = Math.round(currentScheme.start[2] + scrollProgress * (currentScheme.end[2] - currentScheme.start[2]))

  const backgroundColor = `rgb(${r}, ${g}, ${b})`

  return <div className="fixed inset-0 -z-10 transition-colors duration-300 ease-out" style={{ backgroundColor }} />
}
