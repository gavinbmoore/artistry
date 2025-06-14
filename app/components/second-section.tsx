"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { useRouter } from "next/navigation"

export default function SecondSection() {
  const router = useRouter()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleProjectsClick = () => {
    router.push("/projects")
  }

  return (
    <section id="second-section" className="min-h-screen py-20 relative">
      {/* Background Paths */}
      <BackgroundPaths />

      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <GlowingEffect glowColor="rgba(34, 197, 94, 0.6)" intensity={1.2}>
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden cursor-pointer"
                onClick={handleProjectsClick}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundImage: "url('/images/projects-design.png')",
                    filter: "hue-rotate(120deg) saturate(0.8)",
                  }}
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-transparent" />

                <div className="text-center relative z-10">
                  <h3 className="text-xl font-semibold text-white drop-shadow-lg hover:text-green-300 transition-colors">
                    Projects
                  </h3>
                </div>
              </div>
            </GlowingEffect>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlowingEffect glowColor="rgba(34, 197, 94, 0.6)" intensity={1.2}>
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">Ideas</h3>
                </div>
              </div>
            </GlowingEffect>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GlowingEffect glowColor="rgba(34, 197, 94, 0.6)" intensity={1.2}>
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">Learning</h3>
                </div>
              </div>
            </GlowingEffect>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <GlowingEffect glowColor="rgba(34, 197, 94, 0.6)" intensity={1.2}>
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">Reflecting</h3>
                </div>
              </div>
            </GlowingEffect>
          </motion.div>
        </div>
      </div>

      {/* Back to top indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center text-green-200 hover:text-white transition-colors"
        >
          <ArrowUp className="h-6 w-6 mb-2" />
          <span className="text-sm">Back to top</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
