export default function Footer() {
  return (
    <footer className="border-t border-green-800 bg-[#003d2b] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-green-200">© {new Date().getFullYear()} GAV.MO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-green-200 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-green-200 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-green-200 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
