'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/ui/Hero';
import Showcase from '@/components/ui/Showcase';
import Timeline from '@/components/ui/Timeline';
import Skills from '@/components/ui/Skills';
import Footer from '@/components/ui/Footer';

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 3D Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Scene />
      </div>

      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />
        <Showcase />
        <Timeline />
        <Skills />
        <Footer />
      </div>
    </main>
  );
}
