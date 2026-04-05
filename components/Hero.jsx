// Hero_1.jsx — Hero with 3D circular text around the wireframe
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshDistortMaterial, MeshWobbleMaterial, Text, Billboard } from '@react-three/drei'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Button } from "@/components/ui/button"
import * as THREE from 'three'

export function ButtonRounded() {
  return (
    <div className="flex justify-center">
      <Button className="rounded-full" onClick={() => document.getElementById('project').scrollIntoView({ behavior:"smooth"})}>Get Started</Button>
    </div>
  )
}

// ============================================================
// CIRCULAR TEXT — How the trajectory works
// ============================================================
//
// Think of a clock face lying flat on a table.
// Each letter gets placed at a position around the clock.
//
// The ANGLE determines WHERE on the clock (0° = 3 o'clock, 90° = 12 o'clock, etc.)
// The RADIUS determines HOW FAR from the center.
//
// We use cos(angle) and sin(angle) to convert an angle into X/Z coordinates:
//   x = cos(angle) * radius   ← left/right
//   y = (not used here)        ← up/down (controlled by yOffset)
//   z = sin(angle) * radius   ← forward/backward
//
// This traces a FLAT CIRCLE on the XZ plane (horizontal).
//
// To change the trajectory, you change WHICH axes get the cos/sin values:
//   XZ plane (flat, like a record):  x = cos, z = sin  ← current
//   XY plane (upright, like a wheel): x = cos, y = sin
//   YZ plane (sideways wheel):        y = cos, z = sin
//
// Or TILT the whole ring by changing the <group rotation={[...]}> below.
// ============================================================

function CircularText3D({
  text = "    本音が表現できる      ·       ~ 常 日     · ",
  radiusX = 1,          // Horizontal radius (wider = more oval)
  radiusY = 1,          // Vertical radius (shorter = more oval)
  fontSize = 0.12,     // Size of each character
  color = "white",
  yOffset = 0.15,      // Shifts the whole ring up (+) or down (-)

  // TRAJECTORY CONTROL — tilt the entire text ring (in radians)
  // [X-tilt, Y-tilt, Z-tilt]
  //   X-tilt: tips the ring forward/backward (like nodding your head)
  //           Math.PI / 2 = ring goes from flat → upright facing you
  //   Y-tilt: spins the ring around the vertical axis (like turning a steering wheel)
  //           Math.PI / 4 = 45° rotation
  //   Z-tilt: rolls the ring sideways (like tilting your head)
  //           Math.PI / 6 = 30° lean
    // X-tilt = Math.PI / 2; // ring goes from flat → upright facing you
    //Y-tilt = Math.PI / 4; //= 45° rotation
    //Z-tilt= Math.PI / 6; //= 30° lean
  // tilt = [Math.PI / 2, 1, 1]
  tilt = [0,0,0]
}) {
  const chars = useMemo(() => text.split(''), [text])
  const ringRef = useRef()

  // ── SPIN: rotate the text ring every frame ──
  // Change the axis to match your plane:
  //   XZ (flat):    rotation.y += speed
  //   XY (upright): rotation.z += speed
  //   YZ (sideways): rotation.x += speed
  // Change the number to control speed:
  //   0.005 = slow and elegant
  //   0.01  = moderate
  //   0.02  = fast
  // Use negative (-0.005) to reverse direction
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.0002    }
  })

  return (
    <group position={[0, yOffset, 0]} rotation={tilt}>
      {/* Inner group that spins */}
      <group ref={ringRef}>
      {chars.map((char, i) => {
        // ── ANGLE: where this letter sits on the circle ──
        // i / chars.length = fraction around the circle (0.0 to 1.0)
        // × Math.PI × 2   = convert to radians (full circle = 2π ≈ 6.28)
        const angle = (i / chars.length) * Math.PI * 2

        // ── POSITION: convert angle → coordinates ──
        // This is where you pick the PLANE the circle lives on:
        //
        // FLAT circle (XZ plane, like a record — default):
        // const x = Math.cos(angle) * radius
        // const z = Math.sin(angle) * radius
        // const y = 0
        //
        // To make an UPRIGHT circle (XY plane, like a ferris wheel), use:
          const x = Math.cos(angle) * radiusX   // horizontal stretch
          const y = Math.sin(angle) * radiusY   // vertical stretch
          const z = 0
        //
        // To make a SIDEWAYS circle (YZ plane), use:
          // const x = 0
          // const y = Math.cos(angle) * radius
          // const z = Math.sin(angle) * radius

        return (
          // Billboard makes each letter always face the camera
          // Remove Billboard and use a fixed rotation={...} if you
          // want the letters to face a specific direction instead
          <Billboard key={i} position={[x, y, z]}>
            <Text
              fontSize={0.14}
              color={color}
              letterSpacing={0.05}
              anchorX="center"
              anchorY="middle"
            >
              {char}
            </Text>
          </Billboard>
        )
      })}
      </group>
    </group>
  )
}

// Adjusts camera distance based on screen width
// Desktop (wide) = closer to the ring, Mobile (narrow) = farther away
function ResponsiveCamera() {
  const { camera } = useThree()

  useEffect(() => {
    function updateCamera() {
      const isMobile = window.innerWidth < 768 // 768px = typical tablet/mobile breakpoint

      if (isMobile) {
        // Mobile: pull camera back so the full ring is visible on small screens
        camera.position.set(-1, 2, -3)
      } else {
        // Desktop: closer for a more immersive, detailed view
        camera.position.set(0.6, 0.2, -2.8)
      }
      camera.updateProjectionMatrix()
    }

    updateCamera() // run once on mount
    window.addEventListener('resize', updateCamera)
    return () => window.removeEventListener('resize', updateCamera)
  }, [camera])

  return null // this component doesn't render anything visible
}

// The 3D shape that spins in the background
function Shape() {
  const sphere = useRef()
  const wire_frame = useRef()
  // const X = 1;
  // const Y = 1.3;
  // const Z = 1;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // sphere.current.rotation.y += 0.001
    wire_frame.current.rotation.y += 0.0002
    wire_frame.current.rotation.x += 0.0002
  })

  return (
    <group ref={sphere}>
      {/* scale={[X, Y, Z]} stretches the torus into an oval        */}
      {/*   [1, 1, 1]       → perfect circle (default)              */}
      {/*   [1.5, 1, 1]     → wide oval (stretched horizontally)    */}
      {/*   [1, 1.5, 1]     → tall oval (stretched vertically)      */}
      {/*   [1, 1, 1.5]     → deep oval (stretched forward/back)    */}
      {/*   [2, 0.7, 1]     → very wide and squished                */}
      <mesh scale={[1.1, 1.4, 1]} rotation={[0,0.7,1]}>
        <torusGeometry args={[1, 0.09, 32, 100, 10]} />
        <MeshWobbleMaterial color="silver" factor={0.03} speed={0.3} />
        <MeshDistortMaterial color="silver" distort={0.3} speed={1} radius ={1} />
      </mesh>

      <mesh ref={wire_frame}>
        <icosahedronGeometry args={[0, 1]} />
        <meshBasicMaterial color="silver" wireframe />
      </mesh>

      {/* Text sits on the outer surface of the torus (R + tube = 1.09) */}
      {/* Try changing tilt to see different trajectories:                */}
      {/*   tilt={[0, 0, 0]}               → flat (follows torus)       */}
      {/*   tilt={[Math.PI / 2, 0, 0]}     → upright, facing you        */}
      {/*   tilt={[Math.PI / 4, 0, 0]}     → 45° tilt forward           */}
      {/*   tilt={[0, 0, Math.PI / 6]}     → 30° lean sideways          */}
      {/*   tilt={[Math.PI/4, 0, Math.PI/4]} → diagonal                 */}
      {/* radiusX = horizontal, radiusY = vertical                     */}
      {/* Same value = perfect circle. Different = oval.                 */}
      {/*   radiusX={1.8} radiusY={1}   → wide oval (landscape)        */}
      {/*   radiusX={1}   radiusY={1.8} → tall oval (portrait)         */}
      {/*   radiusX={1.3} radiusY={1.3} → perfect circle               */}
      <CircularText3D radiusX={1.4} radiusY={1.4} yOffset={0} fontSize={0.09} tilt={[0, 0, 0]} />
    </group>
  )
}

export default function Hero() {
  const [orbitEnabled, setOrbitEnabled] = useState(false)
  return (
    <section className="relative h-200 flex items-center justify-center text-center px-6">

      {/* Canvas */}
      <div className={`absolute inset-0 ${orbitEnabled ? '' : 'pointer-events-none'}`}>
        <Canvas camera={{ position: [-1, 2, -3] }}>
          {/* Warm cafe lighting */}
          <hemisphereLight intensity={10} args={[0xffa500, 0x1a0e0a, 1]}/>
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={0.5} intensity={10.5} color="#ffa500" />
          <fog attach="fog" args={['#1a0e0a', 3, 10]} />
          <Environment preset="apartment" />

          <ResponsiveCamera />
          <Shape />

          {orbitEnabled && <OrbitControls enableZoom={false} />}
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold tracking-tight mb-4 mix-blend-difference drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">MARU</h1>
        <ButtonRounded />
      </div>

      {/* 3D toggle — mobile only */}
      <button
        onClick={() => setOrbitEnabled(v => !v)}
        className="block md:hidden absolute top-6 left-6 z-20 text-xs px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 transition-colors"
      >
        {orbitEnabled ? 'Exit 3D' : 'Rotate 3D'}
      </button>

    </section>
  )
}
