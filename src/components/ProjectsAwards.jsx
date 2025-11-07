import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

const projects = [
  {
    title: "That’s Trash",
    desc: "A quirky indie experiment about turning chaos into playful mechanics.",
    img: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1400&auto=format&fit=crop",
    link: "https://example.com/trash",
  },
  {
    title: "2D Frits",
    desc: "A crisp 2D platformer prototype focused on feel, flow, and frames.",
    img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1400&auto=format&fit=crop",
    link: "https://example.com/2dfrits",
  },
  {
    title: "Snake Snike",
    desc: "A modern neon twist on a retro classic with juicy FX and shape language.",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1400&auto=format&fit=crop",
    link: "https://example.com/snake",
  },
];

const awards = [
  {
    title: 'Community Choice – Indie Jam',
    year: '2023',
    note: 'Recognized for stylish visuals and compelling gameplay loops.'
  },
  {
    title: 'Certificate – Advanced Shader Art',
    year: '2022',
    note: 'Completed intensive program in real-time rendering & VFX.'
  },
  {
    title: 'Showcase – Digital Art Expo',
    year: '2021',
    note: 'Featured gallery slot for a series of neon cosmic artworks.'
  },
];

const ProjectsAwards = () => {
  return (
    <section id="works" className="relative w-full bg-[#07081A] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-violet-500/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          Projects Gallery
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07081A]/60 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition" />
                </div>
                <p className="mt-1 text-sm text-white/70">{p.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.h2
          id="awards"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mt-16 mb-6"
        >
          Awards & Achievements
        </motion.h2>

        <div className="grid gap-4">
          {awards.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 p-2 ring-1 ring-white/10">
                  <Award className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <div className="font-semibold">
                    {a.title} <span className="text-white/50">• {a.year}</span>
                  </div>
                  <div className="text-sm text-white/70">{a.note}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsAwards;
