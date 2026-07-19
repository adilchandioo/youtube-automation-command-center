import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import World from './scenes/World.jsx'
import useScrollProgress from './hooks/useScrollProgress.js'
import useReveal from './hooks/useReveal.js'

export default function App() {
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const scroll = useScrollProgress()
  useReveal()

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 12 + 4)
      setProgress(p)
      if (p >= 100) {
        clearInterval(id)
        setTimeout(() => setReady(true), 400)
      }
    }, 120)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Loader done={ready} progress={progress} />
      <Cursor />
      <div className="noise" />

      <div className="canvas-wrap">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        >
          <Suspense fallback={null}>
            <World scroll={scroll} />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <div className="content">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
