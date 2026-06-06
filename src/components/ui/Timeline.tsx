'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    company: 'Snap Finance (Persistent Systems)',
    role: 'Senior Frontend Lead',
    period: 'April 2023 – Present',
    description: 'Scaling Point-of-Sale & Virtual Rent-to-Own FinTech Platforms',
    metrics: 'Mentored 4+ devs | Migrated to Next.js App Router | Automated via Claude/Gemini',
    impact: [
      'Financial Form Engineering: Architected and engineered high-stakes, multi-step financial application forms successfully eliminating user friction.',
      'Legacy Modernization & Performance: Established the core technical roadmap to migrate vulnerable legacy codebases, securing an optimized ecosystem.',
      'Agentic Velocity Multipliers: Spearheaded experimental workflows by chaining autonomous agent platforms (Google Antigravity, Cursor).',
      'Team & Stack Governance: Implemented strict context engineering configurations (.cursorrules) to keep code generation aligned.'
    ]
  },
  {
    company: 'Virtusa Consulting Services',
    role: 'Senior Consultant',
    period: '2021 – 2023',
    metrics: 'Micro-Frontend Architecture | FinTech Security | Global Auth Systems',
    impact: [
      'Built secure Micro-Frontend banking structures and granular geo-based user authorization logic.',
      'Mentored junior developers on secure coding practices in FinTech environments.'
    ]
  },
  {
    company: 'Peachmode.com',
    role: 'Senior Developer',
    period: '2018 – 2021',
    description: 'Scaling E-Commerce Architectures for Indian Ethnic Wear',
    metrics: 'Optimized Checkout Path | Integrated Razorpay | Built Gift Card Subsystem',
    impact: [
      'Critical Path Optimization: Completely refactored legacy JavaScript across the platform\'s core revenue pathways.',
      'Payment Infrastructure Overhaul: Rebuilt the entire checkout integration from scratch ensuring zero-drop transactions.',
      'Revenue Generation Systems: Designed and deployed proprietary digital Gift Card subsystem.',
    ]
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item: any) => {
      gsap.from(item.querySelectorAll('.metric-box'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen py-24 px-10 md:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-slate-900">
          Professional <span className="text-leaf">Timeline</span>
        </h2>

        <div className="space-y-32">
          {milestones.map((item, index) => (
            <div key={index} className="timeline-item grid md:grid-cols-12 gap-8 relative">
              {/* Left Column: Role & Impact */}
              <div className="md:col-span-7 relative pl-8 border-l-2 border-leaf/30 glass-container p-8 bg-white/5 shadow-sm">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-leaf shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <h3 className="text-3xl font-bold text-slate-800 mb-1">{item.company}</h3>
                <h4 className="text-xl text-leaf font-bold mb-4">{item.role} <span className="text-slate-400 font-medium ml-2">| {item.period}</span></h4>
                <ul className="space-y-4">
                  {item.impact.map((bullet, i) => (
                    <li key={i} className="text-slate-600 leading-relaxed text-lg flex gap-2">
                      <span className="text-leaf shrink-0">▹</span> {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Metrics & Context */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <div className="metric-box glass-container p-6 bg-white/10">
                  <p className="text-slate-500 italic mb-4">{item.description}</p>
                  <div className="h-px bg-leaf/20 mb-4" />
                  <p className="text-slate-800 font-bold leading-relaxed">
                    {item.metrics}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
