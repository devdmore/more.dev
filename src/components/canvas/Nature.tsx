'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Nature() {
  const group = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  const { scene } = useThree();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollY.current = self.progress;
      }
    });

    // Golden hour transition
    gsap.to(scene.background || {}, {
      scrollTrigger: {
        trigger: 'body',
        start: '20% top',
        end: '40% top',
        scrub: true,
      },
      // Note: background might be null if using Sky, so we transition a custom color if needed
    });

    return () => trigger.kill();
  }, [scene]);

  const elements = useMemo(() => {
    return new Array(30).fill(0).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        -i * 4 - Math.random() * 5,
        (Math.random() - 0.5) * 15 - 5
      ],
      rotation: [0, Math.random() * Math.PI, 0],
      scale: 0.5 + Math.random() * 2,
      color: ['#4ade80', '#22c55e', '#16a34a', '#86efac'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = scrollY.current * 80;
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => (
        <group key={i} position={el.position as any} rotation={el.rotation as any} scale={el.scale}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.2, 3, 6]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[1.2, 2.5, 6]} />
            <meshStandardMaterial color={el.color} flatShading />
          </mesh>
        </group>
      ))}

      {/* Distant mountains/islands */}
      <mesh position={[0, -50, -30]} receiveShadow>
        <sphereGeometry args={[100, 32, 32, 0, Math.PI * 2, 0, 0.5]} />
        <meshStandardMaterial color="#f0fdf4" />
      </mesh>
    </group>
  );
}
