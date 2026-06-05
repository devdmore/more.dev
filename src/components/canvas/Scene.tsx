'use client';

import { Canvas } from '@react-three/fiber';
import { Sky, Environment, ContactShadows } from '@react-three/drei';
import Nature from './Nature';
import Butterflies from './Butterflies';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />

      <Suspense fallback={null}>
        <Nature />
        <Butterflies count={15} />
        <Environment preset="forest" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={2.4}
          far={4.5}
        />
      </Suspense>
    </Canvas>
  );
}
