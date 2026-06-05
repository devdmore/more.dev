'use client';

import { Mail, MapPin, Award } from 'lucide-react';

const awards = [
  'Persistent Systems Bravo Team Award (April 2026)',
  'Bravo Individual Award (Sept 2025)',
  'High Five Award (Nov 2024)'
];

export default function Footer() {
  return (
    <footer className="min-h-screen py-24 px-10 md:px-24 flex flex-col justify-center items-center text-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900">
          Let&apos;s <span className="text-leaf">Collaborate</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          <a href="mailto:devd.more@gmail.com" className="flex items-center gap-2 text-xl text-slate-700 hover:text-leaf transition-colors">
            <Mail /> devd.more@gmail.com
          </a>
          <span className="flex items-center gap-2 text-xl text-slate-700">
            <MapPin /> Kandivali West, Mumbai, India
          </span>
        </div>

        <div className="glass-container p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <Award className="text-leaf" /> Awards & Recognition
          </h3>
          <ul className="space-y-4">
            {awards.map((award, i) => (
              <li key={i} className="text-slate-600 font-medium">
                {award}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-24 text-slate-500 text-sm">
          © {new Date().getFullYear()} Devendra Madan More. Built with Next.js, Three.js & Agentic Workflows.
        </p>
      </div>
    </footer>
  );
}
