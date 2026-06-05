'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.hero-text', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
    });

    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 200,
      opacity: 0
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen flex flex-col justify-center px-10 md:px-24">
      <div className="hero-content max-w-4xl">
        <h1 className="hero-text text-6xl md:text-8xl font-bold text-slate-900 leading-tight">
          Architectural <br />
          <span className="text-leaf">Engineering.</span>
        </h1>
        <h2 className="hero-text text-3xl md:text-5xl font-medium text-slate-700 mt-4">
          Multiplied by Autonomous Agents.
        </h2>
        <p className="hero-text text-xl text-slate-600 mt-8 max-w-2xl leading-relaxed">
          Hi, I&apos;m <span className="font-bold text-slate-900">Devendra Madan More</span>.
          I am a Senior Frontend Lead building high-performance financial architectures with React/Next.js
          and pioneering Agentic Software Development workflows to scale UI velocity.
        </p>
      </div>
    </section>
  );
}
