import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import CTA from '../components/CTA'

export default function App() {
  return (
    <main>
      {/* Sections — reorder or add new ones here */}
      <Hero />
      <About />
      <Features />
      <CTA />
    </main>
  )
}
