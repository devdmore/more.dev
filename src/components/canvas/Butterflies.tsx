'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Butterflies({ count = 120 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const scrollY = useRef(0);
  const { mouse, viewport, camera } = useThree();
  const [glowColor, setGlowColor] = useState(new THREE.Color("#bef264"));

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

    const handleGlow = (e: any) => {
      setGlowColor(new THREE.Color(e.detail.color));
    };
    window.addEventListener('butterfly-glow', handleGlow);

    return () => {
      trigger.kill();
      window.removeEventListener('butterfly-glow', handleGlow);
    };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 50;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -10 + Math.random() * 20;
      const zFactor = -2 + Math.random() * 12; // Bring them more to the front
      temp.push({ t, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const colorObj = new THREE.Color();

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      let { t, speed, xFactor, yFactor, zFactor } = particle;

      particle.t += speed;
      t = particle.t;

      // Mouse influence in world coordinates
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Base flight path
      let x = xFactor + Math.sin(t * 0.5) * 5;
      let y = yFactor + Math.cos(t * 0.3) * 5;
      let z = zFactor + Math.sin(t * 0.2) * 5;

      // Interaction: Grouping behavior for Showcase (roughly progress 0.2 to 0.45)
      if (scrollY.current > 0.2 && scrollY.current < 0.45) {
         const lerpFactor = (scrollY.current - 0.2) / 0.25;
         const gridX = ((i % 10) - 5) * 1.5;
         const gridY = (Math.floor(i / 10) - 3) * 1.5;
         x = THREE.MathUtils.lerp(x, gridX, lerpFactor);
         y = THREE.MathUtils.lerp(y, gridY, lerpFactor);
         z = THREE.MathUtils.lerp(z, 0, lerpFactor);
      }

      // Special behavior for Hero Butterfly (index 0)
      if (i === 0 && scrollY.current < 0.1) {
        x = 5; // Near headline
        y = 3;
        z = 5;

        // React to mouse
        const hdx = x - pos.x;
        const hdy = y - pos.y;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hdist < 5) {
          x += hdx * 0.2;
          y += hdy * 0.2;
        }
      } else {
        // Interaction: scatter from mouse for others
        const dx = x - pos.x;
        const dy = y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          x += (dx / dist) * (3 - dist) * 2;
          y += (dy / dist) * (3 - dist) * 2;
        }
      }

      dummy.position.set(x, y - scrollY.current * 40, z);

      // Follow camera Y slightly to stay in view
      dummy.position.y += camera.position.y - 2;

      // Wing beat animation - faster if mouse is near for hero butterfly
      let beatFreq = 20;
      if (i === 0 && scrollY.current < 0.1) {
        const hdist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        beatFreq = 10 + (1 / (hdist + 0.1)) * 10;
      }

      const wingBeat = Math.sin(t * beatFreq);
      const s = i === 0 && scrollY.current < 0.1 ? 2.5 : 1.5;
      dummy.scale.set(s, s * (0.3 + Math.abs(wingBeat)), s);

      // Orientation
      dummy.rotation.set(Math.sin(t * 0.5), Math.cos(t * 0.3), t);

      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    // Handle global color lerping
    if (mesh.current.material instanceof THREE.MeshStandardMaterial) {
       mesh.current.material.emissive.lerp(glowColor, 0.05);
       mesh.current.material.color.lerp(glowColor, 0.05);
       mesh.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.5;
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshStandardMaterial
        color="#bef264"
        emissive="#bef264"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
