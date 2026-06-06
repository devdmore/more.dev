'use client';

import { Canvas } from '@react-three/fiber';
import { Sky, Environment, ContactShadows } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Nature from './Nature';
import Butterflies from './Butterflies';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CameraRig() {
  useFrame((state) => {
    const scroll = ScrollTrigger.getAll()[0]?.progress || 0;
    // Move camera down as we scroll
    state.camera.position.y = 5 - scroll * 25;

    // Look slightly down during descent, then up toward sky at the end (Footer)
    const lookTargetY = scroll > 0.8
      ? state.camera.position.y + (scroll - 0.8) * 50
      : state.camera.position.y - 2;

    state.camera.lookAt(0, lookTargetY, -10);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[50, 50, 50]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Suspense fallback={null}>
        <Nature />
        <Butterflies count={120} />
        <Environment preset="park" />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <ContactShadows
          position={[0, -5, 0]}
          opacity={0.4}
          scale={40}
          blur={2}
          far={10}
        />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
