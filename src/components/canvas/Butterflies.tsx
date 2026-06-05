'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Butterflies({ count = 15 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const scrollY = useRef(0);
  const { mouse, viewport } = useThree();

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

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 50;
      const speed = 0.01 + Math.random() / 100;
      const xFactor = -8 + Math.random() * 16;
      const yFactor = -4 + Math.random() * 8;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

      // Update time for flight path
      particle.t += speed;
      t = particle.t;

      // Mouse influence
      particle.mx += (mouse.x * viewport.width - particle.mx) * 0.05;
      particle.my += (mouse.y * viewport.height - particle.my) * 0.05;

      // Interaction: scatter when mouse is close
      const dx = particle.mx - dummy.position.x;
      const dy = particle.my - dummy.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scatter = dist < 2 ? (2 - dist) * 2 : 0;

      // Base flight path (Lissajous-like)
      const x = (particle.mx / 10) + xFactor + Math.sin(t * 0.5) * factor / 5;
      const y = (particle.my / 10) + yFactor + Math.cos(t * 0.3) * factor / 5;
      const z = zFactor + Math.sin(t * 0.2) * factor / 5;

      dummy.position.set(x + (dx/dist)*scatter, y + (dy/dist)*scatter, z);

      // Scroll depth influence
      dummy.position.y -= scrollY.current * 30;

      // Interaction: Grouping behavior based on scroll sections
      if (scrollY.current > 0.2 && scrollY.current < 0.4) {
         // Grouping phase for Showcase
         dummy.position.x *= 0.95;
      }

      // Wing beat animation (represented by scale change)
      const wingBeat = Math.sin(t * 15 + (dist < 3 ? 20 : 0));
      dummy.scale.set(0.2, 0.2, 0.2 * (0.5 + Math.abs(wingBeat)));

      // Orientation
      dummy.rotation.set(Math.sin(t * 0.5), Math.cos(t * 0.3), t);

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow>
      <boxGeometry args={[0.5, 0.05, 0.5]} />
      <meshStandardMaterial
        color="#facc15"
        emissive="#facc15"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}
