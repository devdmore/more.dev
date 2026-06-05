'use client';

const skills = {
  'Core Engineering': [
    'Next.js (App Router)', 'React', 'TypeScript', 'Redux Toolkit', 'Micro-Frontends'
  ],
  'AI & Next-Gen Tools': [
    'Google Antigravity', 'Cursor', 'Claude', 'Gemini Pro/Flash APIs', 'Prompt Engineering'
  ],
  'Performance & Ops': [
    'Core Web Vitals', 'Technical SEO Strategy', 'Code Splitting', 'Headless CMS (Storyblok, Sanity)'
  ]
};

export default function Skills() {
  return (
    <section className="min-h-screen py-24 px-10 md:px-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-slate-900 text-center">
          Technical <span className="text-leaf">DNA</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {Object.entries(skills).map(([category, tags]) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-leaf/20 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white/40 border border-leaf/10 text-slate-700 text-sm font-medium hover:bg-leaf hover:text-white transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
