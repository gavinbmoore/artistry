import Hero from "./components/hero"
import SecondSection from "./components/second-section"
import StickyNotesManager from "./components/sticky-notes-manager"
import ScrollBackground from "./components/scroll-background"

export default function Page() {
  return (
    <>
      <ScrollBackground />
      <main className="min-h-screen text-white relative">
        <Hero />
        <SecondSection />
        <StickyNotesManager />
      </main>
    </>
  )
}
