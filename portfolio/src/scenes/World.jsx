import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Stars,
  Sparkles,
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField.jsx'

/**
 * Scroll-driven 3D world.
 * Sections: 0-Hero, 1-About, 2-Projects, 3-Skills, 4-Contact
 * Camera and objects morph based on scroll.current (0..1).
 */
export default function World({ scroll }) {
  const group = useRef()
  const coreRef = useRef()
  const torusRef = useRef()
  const icoRef = useRef()
  const ringRef = useRef()
  const { camera, mouse } = useThree()

  // Camera path waypoints for each section
  const waypoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 8),      // hero
      new THREE.Vector3(3, 1, 6),      // about
      new THREE.Vector3(-2, -1, 5),    // projects
      new THREE.Vector3(2, 2, 7),      // skills
      new THREE.Vector3(0, 0, 10),     // contact
    ],
    []
  )
  const lookAts = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
    ],
    []
  )

  const target = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const s = scroll.current // 0..1
    // Map to segment
    const total = waypoints.length - 1
    const seg = Math.min(total - 1, Math.floor(s * total))
    const t = s * total - seg
    const eased = t * t * (3 - 2 * t) // smoothstep

    target.lerpVectors(waypoints[seg], waypoints[seg + 1], eased)
    look.lerpVectors(lookAts[seg], lookAts[seg + 1], eased)

    // Subtle parallax from mouse
    target.x += mouse.x * 0.4
    target.y += mouse.y * 0.3

    camera.position.lerp(target, 0.06)
    camera.lookAt(look)

    // Animate objects
    const time = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.15
      coreRef.current.rotation.y = time * 0.2
      const scale = 1 + Math.sin(time * 0.8) * 0.05 + s * 0.3
      coreRef.current.scale.setScalar(scale)
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3 + s * Math.PI
      torusRef.current.rotation.y = time * 0.2
    }
    if (icoRef.current) {
      icoRef.current.rotation.y = -time * 0.25
      icoRef.current.rotation.z = time * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15
    }
    if (group.current) {
      group.current.rotation.y = s * Math.PI * 0.5
    }
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#f472b6" distance={10} />

      <Environment preset="night" />

      {/* Background layers */}
      <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.5} />
      <ParticleField count={800} />

      <group ref={group}>
        {/* Central distorted core — the "planet" */}
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.4, 48]} />
            <MeshDistortMaterial
              color="#8b5cf6"
              emissive="#6d28d9"
              emissiveIntensity={0.4}
              distort={0.45}
              speed={1.5}
              roughness={0.15}
              metalness={0.6}
            />
          </mesh>
        </Float>

        {/* Glass torus orbiting */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
          <mesh ref={torusRef} position={[3.2, 0.5, -1]}>
            <torusKnotGeometry args={[0.55, 0.18, 128, 24]} />
            <MeshTransmissionMaterial
              backside
              samples={6}
              thickness={0.6}
              chromaticAberration={0.6}
              anisotropy={0.5}
              distortion={0.3}
              distortionScale={0.4}
              temporalDistortion={0.2}
              iridescence={1}
              iridescenceIOR={1.5}
              color="#06b6d4"
              roughness={0.05}
            />
          </mesh>
        </Float>

        {/* Small icosahedron */}
        <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1}>
          <mesh ref={icoRef} position={[-3, -1.2, 0.5]}>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#f472b6"
              emissive="#db2777"
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
              flatShading
            />
          </mesh>
        </Float>

        {/* Wire ring halo */}
        <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.6, 0.008, 8, 128]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 3.5, Math.PI / 4, 0]}>
          <torusGeometry args={[3.1, 0.005, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>

        <Sparkles count={80} scale={[10, 6, 6]} size={2} speed={0.4} color="#a78bfa" />
      </group>

      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0006, 0.0012]}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    </>
  )
}
