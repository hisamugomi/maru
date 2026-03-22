// Hero_1.jsx — Hero with 3D circular text around the wireframe
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshDistortMaterial, MeshWobbleMaterial, Text } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
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
  text = "MARU · DESIGN · BUSINESS · MARU · DESIGN · BUSINESS · ",
  radius = 1,          // Distance from center — match your geometry's radius
  fontSize = 0.12,     // Size of each character
  color = "silver",
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

  return (
    // ── GROUP: controls the ring's position and tilt ──
    // position: [left/right, up/down, forward/back]
    // rotation: [X-tilt, Y-tilt, Z-tilt] in radians
    //   Quick radian reference:
    //     Math.PI / 6  = 30°
    //     Math.PI / 4  = 45°
    //     Math.PI / 3  = 60°
    //     Math.PI / 2  = 90°
    //     Math.PI      = 180°
    <group position={[0, yOffset, 0]} rotation={tilt}>
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
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const z = 0
        //
        // To make a SIDEWAYS circle (YZ plane), use:
          // const x = 0
          // const y = Math.cos(angle) * radius
          // const z = Math.sin(angle) * radius

        return (
          <Text
            key={i}
            position={[x, y, z]}
            // ── ROTATION: make each letter face outward from the center ──
            // -angle rotates the letter to match its position on the circle
            // + Math.PI/2 adjusts so the letter faces outward (not sideways)
            // If you change the plane above, you need to change this too:
            //   XZ (flat):     rotation={[0, -angle + Math.PI/2, 0]}
            //   XY (upright):  rotation={[0, 0, -angle + Math.PI/2]}
            //   YZ (sideways): rotation={[-angle + Math.PI/2, 0, 0]}
            // XZ (flat):     rotation={[0, -angle + Math.PI/2, 0]}
            // XY (upright):  rotation={[0, 0, angle - Math.PI/2]}
            // YZ (sideways): rotation={[angle - Math.PI/2, 0, 0]}
            rotation={[0, Math.PI, 0]}
            fontSize={fontSize}
            color={color}
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
          >
            {char}
          </Text>
        )
      })}
    </group>
  )
}

// The 3D shape that spins in the background
function Shape() {
  const sphere = useRef()
  const wire_frame = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    sphere.current.rotation.y += 0.001
    wire_frame.current.rotation.y += 0.0002
    wire_frame.current.rotation.x += 0.0002
  })

  return (
    <group ref={sphere}>
      <mesh>
        <torusGeometry args={[1, 0.09, 32, 100, 10]} />
        <MeshWobbleMaterial color="silver" factor={0.5} speed={1} />
        <MeshDistortMaterial color="silver" factor={0.2} speed={1} />
      </mesh>

      <mesh ref={wire_frame}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="silver" wireframe />
      </mesh>

      {/* Text sits on the outer surface of the torus (R + tube = 1.09) */}
      {/* Try changing tilt to see different trajectories:                */}
      {/*   tilt={[0, 0, 0]}               → flat (follows torus)       */}
      {/*   tilt={[Math.PI / 2, 0, 0]}     → upright, facing you        */}
      {/*   tilt={[Math.PI / 4, 0, 0]}     → 45° tilt forward           */}
      {/*   tilt={[0, 0, Math.PI / 6]}     → 30° lean sideways          */}
      {/*   tilt={[Math.PI/4, 0, Math.PI/4]} → diagonal                 */}
      <CircularText3D radius={1.3} yOffset={0} fontSize={0.09} tilt={[0, 0, 0]} />
    </group>
  )
}

export default function Hero() {
  const [orbitEnabled, setOrbitEnabled] = useState(true)
  return (
    <section className="relative h-200 flex items-center justify-center text-center px-6">

      {/* Canvas */}
      <div className={`absolute inset-0 ${orbitEnabled ? '' : 'pointer-events-none'}`}>
        <Canvas camera={{ position: [0, 1.5, 3] }}>
          {/* Warm cafe lighting */}
          <hemisphereLight intensity={10} args={[0xffa500, 0x1a0e0a, 1]}/>
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={0.5} intensity={10.5} color="#ffa500" />
          <fog attach="fog" args={['#1a0e0a', 3, 10]} />
          <Environment preset="apartment" />

          <Shape />

          {orbitEnabled && <OrbitControls enableZoom={false} />}
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold tracking-tight mb-4 mix-blend-difference drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">Maru</h1>
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
