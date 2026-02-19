import Header from './components/Header'
import AboutSection from './components/AboutSection'

export default function Home() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.5), #75405fff, rgba(0,0,0,0.5))',
      }}
    >
      <Header />

      {/* Banner Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <img 
          src="https://img.etsystatic.com/il/bd897e/1424256190/il_fullxfull.1424256190_4nfe.jpg?version=0" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div
          className="relative p-10 text-center max-w-lg rounded-xl shadow-lg
                     bg-[#75405fff] backdrop-blur-md border border-gray-700"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">Smart Bookmark App</h1>
          <p className="mb-6 text-white/90">
            Save, manage, and access your bookmarks in real-time.
          </p>
          <a
            href="/login"
            className="
              px-6 py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-black via-[#75405f] to-black
              backdrop-blur-md
              hover:from-[#a36e85] hover:via-[#b1889a] hover:to-[#a36e85]
              transition-all duration-300
            "
          >
            Get Started
          </a>
        </div>
      </section>

      {/* About / Features Section */}
      <AboutSection className="mb-0" />  {/* remove bottom margin if any */}

      {/* Footer Section */}
      <footer
        className="p-10 pt-2 text-center rounded-t-2xl"  // removed mt-20
        style={{ 
          background: 'linear-gradient(to right, rgba(0,0,0,0.5), #75405fff, rgba(0,0,0,0.5))',
          backdropFilter: 'blur(8px)',
          color: '#f5f5f5'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h4 className="text-xl font-semibold mb-2">Smart Bookmark</h4>
          <p className="mb-4">
            Save your bookmarks safely and access them anywhere, anytime.
          </p>
          <p className="text-sm">&copy; {new Date().getFullYear()} Smart Bookmark. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
