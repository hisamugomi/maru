import Hero from '../components/Hero_1'
import About from '../components/About'
import Team from '../components/Team'
import Features from '../components/Features'
import CTA from '../components/CTA'

export default function App() {
  return (
    <main>
      {/* Sections — reorder or add new ones here */}
      <Hero />
      <CTA />
      <About />
      <Features />
      <Team />
    </main>
  )
}
