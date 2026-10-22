import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import SoftSkills from './components/SoftSkills'
import Hobbies from './components/Hobbies'
import CardPreview from './components/CardPreview'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  if (window.location.pathname === '/dhdglol666') {
    return <Admin />
  }

  return (
    <main className="app">
      <Hero />
      <About />
      <Skills />
      <div className="grid-2">
        <Experience />
        <div className="right-column">
          <Education />
          <SoftSkills />
          <Hobbies />
          <CardPreview />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default App
