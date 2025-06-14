"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Portfolio",
      description: "A dynamic portfolio website with AI-generated content and interactive 3D elements.",
      image: "/placeholder.svg?height=300&width=400&text=AI+Portfolio",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "AI"],
      status: "Completed",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Creative Dashboard",
      description: "An intuitive dashboard for creative professionals to manage projects and collaborate.",
      image: "/placeholder.svg?height=300&width=400&text=Creative+Dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Progress",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "3D Visualization Tool",
      description: "Interactive 3D data visualization platform for complex datasets.",
      image: "/placeholder.svg?height=300&width=400&text=3D+Visualization",
      technologies: ["Three.js", "WebGL", "D3.js", "Python"],
      status: "Planning",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Mobile Art App",
      description: "Cross-platform mobile application for digital artists and designers.",
      image: "/placeholder.svg?height=300&width=400&text=Mobile+Art+App",
      technologies: ["React Native", "Firebase", "Canvas API"],
      status: "Completed",
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Planning":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-green-400 hover:text-white">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h1>
          </div>
          <div className="text-sm text-gray-400">{projects.length} Projects</div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Interested in collaborating?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3">
              Get In Touch
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
