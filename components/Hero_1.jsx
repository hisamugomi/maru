// Hero.js — the full-screen section with the 3D animation
//
// Canvas   = the Three.js drawing area (like an HTML canvas)
// useFrame = runs a function every animation frame (like requestAnimationFrame)
// useRef   = gives us a direct reference to the 3D object so we can rotate it
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei'
import { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { BoxGeometry, MeshBasicMaterial } from 'three'

export function ButtonRounded() {
  return (
    <div className="flex justify-center">
      <Button className="rounded-full">Get Started</Button>
    </div>
  )
}

// The 3D shape that spins in the background.
// To change the shape, swap <icosahedronGeometry> for any Three.js geometry.
// To change the look, edit the color or remove "wireframe" below.
function Shape() {
  const mug = useRef()
  const wire_frame = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mug.current.rotation.x = Math.sin(t * 0.5) * 0.0015
    mug.current.rotation.z = Math.sin(t * 0.3) * 0.001
    mug.current.rotation.y += 0.0006
    wire_frame.current.rotation.y += 0.0002
    wire_frame.current.rotation.x += 0.0002
  })

  return (
    <group ref={mug}>
      {/* Mug body — open-ended cylinder */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.45, 1, 32, 1, true]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>

      {/* Bottom cap */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Handle — half torus on the side */}
      <mesh position={[-0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Liquid inside — a disc sitting near the top */}
      <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 32]} />
        <meshStandardMaterial color="#3B1A0A" />
      </mesh>

      <mesh position = {[0, -0.56, 0]} rotation={[-Math.PI / 1, 0, 0]}>
        {/* <coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded]} /> */}
        <cylinderGeometry args={[0.4, 0.453, 0.2, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>


      <mesh ref={wire_frame}>
        <icosahedronGeometry args = {[1.5,1,0]}/>
        <meshBasicMaterial color="white" wireframe/>
      </mesh>

    </group>
  )
}



export default function Hero() {
  // orbitEnabled = true: user can drag the 3D shape; false: scroll works normally
  const [orbitEnabled, setOrbitEnabled] = useState(true)
  return (
    <section className="relative h-200 flex items-center justify-center text-center px-6">

      {/* Canvas — pointer-events disabled when orbit is off so scroll works */}
      <div className={`absolute inset-0 ${orbitEnabled ? '' : 'pointer-events-none'}`}>
        <Canvas camera={{ position: [0, 1.5, 3] }}>
          {/* <ambientLight intensity = {0.5} />
          <pointLight position = {[10, 10,10]}/> */}
          {/* <Environment preset = "city"/> */}
          
          {/* Warm cafe lighting */}
          <hemisphereLight intensity={0.3} args={[0xffeedd, 0x1a0e0a, 1]}/>
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={0.5} intensity={1.5} color="#ffeedd" />
          <fog attach="fog" args={['#1a0e0a', 3, 10]} />
          <Environment preset="apartment" />

          <Shape orbitEnabled={orbitEnabled} />

         
          {orbitEnabled && <OrbitControls enableZoom={false} />}
        </Canvas>
      </div>


      {/* Text overlay */}
      <div className="relative z-10">
        {/* TODO: Update the headline and tagline */}
        <h1 className=" text-6xl font-bold tracking-tight mb-4 mix-blend-difference drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">Maru</h1>
        <ButtonRounded />
      </div>

      {/* 3D toggle — bottom-right corner */}
      <button
        onClick={() => setOrbitEnabled(v => !v)}
        className="block md:hidden absolute top-6 left-6 z-20 text-xs px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 transition-colors"
      >
        {orbitEnabled ? 'Exit 3D' : 'Rotate 3D'}
      </button>

    </section>
  )
}
