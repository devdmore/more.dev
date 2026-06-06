'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Nature() {
  const group = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

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

    return () => trigger.kill();
  }, []);

  const elements = useMemo(() => {
    return new Array(40).fill(0).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        -i * 3 - Math.random() * 10,
        (Math.random() - 0.5) * 20 - 5
      ],
      rotation: [0, Math.random() * Math.PI, 0],
      scale: 0.5 + Math.random() * 2,
      speed: 0.5 + Math.random() * 1.5, // Parallax speed
      color: ['#4ade80', '#22c55e', '#16a34a', '#86efac'][Math.floor(Math.random() * 4)],
      isIsland: Math.random() > 0.7
    }));
  }, []);

  const meshRef = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    elements.forEach((el, i) => {
      if (meshRef.current[i]) {
        // Individual parallax movement
        meshRef.current[i]!.position.y = el.position[1] + scrollY.current * 80 * el.speed;
      }
    });
  });

  return (
    <group ref={group}>
      {elements.map((el, i) => (
        <group
          key={i}
          ref={ref => { meshRef.current[i] = ref; }}
          position={[el.position[0], el.position[1], el.position[2]]}
          rotation={el.rotation as any}
          scale={el.scale}
        >
          {el.isIsland ? (
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[2, 1.5, 0.5, 6]} />
              <meshStandardMaterial color="#8b5cf6" opacity={0.3} transparent />
              {/* Add a tree on top of the island */}
              <group position={[0, 1.5, 0]} scale={0.5}>
                <mesh position={[0, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.1, 0.2, 3, 6]} />
                  <meshStandardMaterial color="#78350f" />
                </mesh>
                <mesh position={[0, 2, 0]} castShadow>
                  <coneGeometry args={[1.2, 2.5, 6]} />
                  <meshStandardMaterial color={el.color} flatShading />
                </mesh>
              </group>
            </mesh>
          ) : (
            <group>
              <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.2, 3, 6]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
              <mesh position={[0, 2, 0]} castShadow>
                <coneGeometry args={[1.2, 2.5, 6]} />
                <meshStandardMaterial color={el.color} flatShading />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Distant field */}
      <mesh position={[0, -100, -50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#f0fdf4" />
      </mesh>
    </group>
  );
}
