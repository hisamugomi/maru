// Hero.js — the full-screen section with the 3D animation
//
// Canvas   = the Three.js drawing area (like an HTML canvas)
// useFrame = runs a function every animation frame (like requestAnimationFrame)
// useRef   = gives us a direct reference to the 3D object so we can rotate it
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

// The 3D shape that spins in the background.
// To change the shape, swap <icosahedronGeometry> for any Three.js geometry.
// To change the look, edit the color or remove "wireframe" below.
function Shape() {
  const mesh = useRef()

  // Rotate the shape a tiny bit every frame
  useFrame(() => {
    mesh.current.rotation.y += 0.003
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6">

      {/* Three.js canvas — fills the entire hero area as a background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <hemisphereLight intensity={1} />
          <Shape />
          {/* OrbitControls lets the user drag to rotate the shape */}
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Text overlay — sits on top of the canvas */}
      <div className="relative z-10 pointer-events-none">
        {/* TODO: Update the headline and tagline */}
        <h1 className="text-6xl font-bold tracking-tight mb-4">Maru</h1>
        <p className="text-lg text-gray-400 max-w-md">
          Closing the gap between design and business.
        </p>
      </div>

    </section>
  )
}
