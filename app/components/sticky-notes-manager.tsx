"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import StickyNote from "./sticky-note"

interface Note {
  id: string
  content: string
  x: number
  y: number
}

export default function StickyNotesManager() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("gavmo-sticky-notes")
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error("Error loading notes:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save notes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("gavmo-sticky-notes", JSON.stringify(notes))
    }
  }, [notes, isLoaded])

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: "",
      x: Math.random() * (window.innerWidth - 250),
      y: Math.random() * (window.innerHeight - 200) + 100,
    }
    setNotes([...notes, newNote])
  }

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content } : note)))
  }

  const updateNotePosition = (id: string, x: number, y: number) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, x, y } : note)))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <>
      {/* Add note button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={addNote}
          className="h-12 w-12 rounded-full bg-lime-400 hover:bg-lime-500 text-lime-900 shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Sticky notes */}
      <AnimatePresence>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            content={note.content}
            initialX={note.x}
            initialY={note.y}
            onUpdate={updateNote}
            onUpdatePosition={updateNotePosition}
            onDelete={deleteNote}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
