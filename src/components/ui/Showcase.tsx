'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Agentic Workflow Orchestration',
    description: 'Leveraging Google Antigravity and Cursor to run parallel autonomous agents for async code refactoring and automated dependency upgrades.',
    icon: <Zap className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Spec-Driven Architecture',
    description: 'Utilizing AWS Kiro AI and OpenAI Codex to synthesize high-level prompts into highly optimized production components.',
    icon: <Target className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Context Engineering',
    description: 'Building strict .cursorrules and code indexing structures to enforce safe TypeScript definitions and eradicate model hallucinations.',
    icon: <Shield className="w-6 h-6 text-green-500" />
  }
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.pillar-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-10 md:px-24 flex flex-col justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-slate-900">
          The Agentic <span className="text-leaf">Workflow</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="pillar-card glass-container p-8 flex flex-col gap-4 hover:bg-white/30 transition-colors">
              <div className="bg-white/50 w-12 h-12 rounded-lg flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{pillar.title}</h3>
              <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
